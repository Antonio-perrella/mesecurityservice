import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Subject, of, throwError } from 'rxjs';

import { FormMail, FormMailService } from '../../../shared/form-mail.service';
import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let element: HTMLElement;
  let mail: jasmine.SpyObj<FormMailService>;

  const fillValidForm = () => component.form.setValue({
    name: 'Mario Rossi',
    company: '',
    email: 'mario@example.com',
    phone: '+39 333 123 4567',
    service: 'Presidio fisso',
    message: 'Vorrei un preventivo per un cantiere.',
    privacy: true,
    website: '',
  });

  const submit = () => {
    element.querySelector<HTMLFormElement>('form')!.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    mail = jasmine.createSpyObj<FormMailService>('FormMailService', ['send']);
    mail.send.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [provideRouter([]), { provide: FormMailService, useValue: mail }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not send an incomplete form, and show the errors', () => {
    submit();

    expect(mail.send).not.toHaveBeenCalled();
    expect(element.querySelector('#cf-name-error')).toBeTruthy();
    expect(element.querySelector('#cf-email-error')).toBeTruthy();
    expect(element.querySelector('#cf-message-error')).toBeTruthy();
    expect(element.querySelector('#cf-privacy-error')).toBeTruthy();
  });

  it('should reject an email without a domain extension', () => {
    component.form.controls.email.setValue('mario@rossi');
    expect(component.form.controls.email.valid).toBeFalse();
  });

  it('should send the filled-in fields with the visitor as reply-to', () => {
    fillValidForm();
    submit();

    const sent: FormMail = mail.send.calls.mostRecent().args[0];
    expect(sent.subject).toBe('Richiesta dal sito - Mario Rossi');
    expect(sent.replyTo).toBe('mario@example.com');
    expect(sent.fields).toEqual({
      'Nome e cognome': 'Mario Rossi',
      'Azienda': '-',
      'Email': 'mario@example.com',
      'Telefono': '+39 333 123 4567',
      'Servizio di interesse': 'Presidio fisso',
      'Messaggio': 'Vorrei un preventivo per un cantiere.',
    });
  });

  it('should confirm the delivery and empty the form', () => {
    fillValidForm();
    submit();

    expect(element.querySelector('.form-alert--success')).toBeTruthy();
    expect(component.form.controls.name.value).toBe('');
  });

  it('should disable the button while sending', () => {
    const pending = new Subject<void>();
    mail.send.and.returnValue(pending);
    fillValidForm();
    submit();

    expect(element.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled).toBeTrue();
    pending.complete();
  });

  it('should show the phone and WhatsApp alternatives when sending fails', () => {
    mail.send.and.returnValue(throwError(() => new Error('down')));
    fillValidForm();
    submit();

    const alert = element.querySelector('.form-alert--error')!;
    expect(alert.querySelector('a[href="tel:+393522456708"]')).toBeTruthy();
    expect(alert.querySelector('a[href^="https://wa.me/"]')).toBeTruthy();
    expect(component.form.controls.name.value).toBe('Mario Rossi');
  });

  it('should silently drop submissions that fill the honeypot', () => {
    fillValidForm();
    component.form.controls.website.setValue('https://spam.example');
    submit();

    expect(mail.send).not.toHaveBeenCalled();
    expect(element.querySelector('.form-alert--success')).toBeTruthy();
  });
});
