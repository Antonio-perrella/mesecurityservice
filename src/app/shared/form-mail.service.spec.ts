import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FORM_MAIL_ENDPOINT } from './contact-info';
import { FormMail, FormMailService } from './form-mail.service';

describe('FormMailService', () => {
  let service: FormMailService;
  let http: HttpTestingController;

  const mail: FormMail = {
    subject: 'Nuovo messaggio',
    replyTo: 'mario@example.com',
    fields: { Nome: 'Mario Rossi', Messaggio: 'Buongiorno' },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(FormMailService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should post the fields and the FormSubmit options as JSON', () => {
    service.send(mail).subscribe();

    const request = http.expectOne(FORM_MAIL_ENDPOINT);
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Accept')).toBe('application/json');
    expect(request.request.body).toEqual({
      Nome: 'Mario Rossi',
      Messaggio: 'Buongiorno',
      _subject: 'Nuovo messaggio',
      _replyto: 'mario@example.com',
      _template: 'table',
      _captcha: 'false',
    });
    request.flush({ success: 'true', message: 'The form was submitted successfully.' });
  });

  it('should complete when FormSubmit confirms the delivery', () => {
    let done = false;
    service.send(mail).subscribe({ complete: () => done = true });

    http.expectOne(FORM_MAIL_ENDPOINT).flush({ success: 'true' });
    expect(done).toBeTrue();
  });

  it('should fail when FormSubmit answers success "false"', () => {
    let error: Error | undefined;
    service.send(mail).subscribe({ error: e => error = e });

    http.expectOne(FORM_MAIL_ENDPOINT).flush({ success: 'false', message: 'This form needs Activation.' });
    expect(error?.message).toBe('This form needs Activation.');
  });

  it('should fail on a network or server error', () => {
    let failed = false;
    service.send(mail).subscribe({ error: () => failed = true });

    http.expectOne(FORM_MAIL_ENDPOINT).flush('Server error', { status: 500, statusText: 'Server Error' });
    expect(failed).toBeTrue();
  });
});
