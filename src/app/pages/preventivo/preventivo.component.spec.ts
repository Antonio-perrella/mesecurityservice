import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { FormMail, FormMailService } from '../../shared/form-mail.service';
import { PreventivoComponent } from './preventivo.component';

describe('PreventivoComponent', () => {
  let component: PreventivoComponent;
  let fixture: ComponentFixture<PreventivoComponent>;
  let element: HTMLElement;
  let mail: jasmine.SpyObj<FormMailService>;

  const optionLabels = () =>
    Array.from(element.querySelectorAll('.service-option span')).map(title => title.textContent!.trim());

  const check = (title: string) => {
    const label = Array.from(element.querySelectorAll<HTMLLabelElement>('.service-option'))
      .find(option => option.querySelector('span')!.textContent!.trim() === title)!;
    label.querySelector('input')!.click();
  };

  const fillContactData = () => component.form.patchValue({
    name: 'Mario Rossi',
    email: 'mario@example.com',
    phone: '333 1234567',
    privacy: true,
  });

  const submit = () => {
    element.querySelector<HTMLFormElement>('form')!.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    mail = jasmine.createSpyObj<FormMailService>('FormMailService', ['send']);
    mail.send.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [PreventivoComponent],
      providers: [provideRouter([]), { provide: FormMailService, useValue: mail }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreventivoComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a single h1', () => {
    expect(element.querySelectorAll('h1').length).toBe(1);
  });

  it('should offer every service of the site, with the fiduciary services one by one', () => {
    expect(optionLabels()).toEqual([
      'Portierato e custodia',
      'Reception e accoglienza',
      'Controllo accessi',
      'Servizi fiduciari temporanei',
      'Vigilanza non armata',
      'Presidio fisso',
      'Eventi e manifestazioni',
      'Controllo accessi e gestione flussi',
      'Servizi personalizzati',
    ]);
  });

  it('should require at least one service', () => {
    fillContactData();
    submit();

    expect(mail.send).not.toHaveBeenCalled();
    expect(element.querySelector('#qf-services-error')).toBeTruthy();
  });

  it('should send the selected services, the notes and the contact data', () => {
    check('Portierato e custodia');
    check('Presidio fisso');
    component.form.controls.notes.setValue('Cantiere a Napoli, turni notturni per 3 mesi.');
    fillContactData();
    submit();

    const sent: FormMail = mail.send.calls.mostRecent().args[0];
    expect(sent.subject).toBe('Richiesta di preventivo - Mario Rossi');
    expect(sent.replyTo).toBe('mario@example.com');
    expect(sent.fields).toEqual({
      'Nome e cognome': 'Mario Rossi',
      'Azienda': '-',
      'Email': 'mario@example.com',
      'Telefono': '333 1234567',
      'Servizi richiesti': 'Portierato e custodia, Presidio fisso',
      'Note': 'Cantiere a Napoli, turni notturni per 3 mesi.',
    });
  });

  it('should confirm the delivery and empty the form', () => {
    check('Vigilanza non armata');
    fillContactData();
    submit();

    expect(element.querySelector('.form-alert--success')).toBeTruthy();
    expect(component.form.controls.name.value).toBe('');
    expect(Object.values(component.form.controls.services.value).some(Boolean)).toBeFalse();
  });

  it('should show the phone and WhatsApp alternatives when sending fails', () => {
    mail.send.and.returnValue(throwError(() => new Error('down')));
    check('Vigilanza non armata');
    fillContactData();
    submit();

    const alert = element.querySelector('.form-alert--error')!;
    expect(alert.querySelector('a[href="tel:+393522456708"]')).toBeTruthy();
    expect(alert.querySelector('a[href^="https://wa.me/"]')).toBeTruthy();
  });

  it('should silently drop submissions that fill the honeypot', () => {
    check('Vigilanza non armata');
    fillContactData();
    component.form.controls.website.setValue('https://spam.example');
    submit();

    expect(mail.send).not.toHaveBeenCalled();
    expect(element.querySelector('.form-alert--success')).toBeTruthy();
  });

  it('should offer phone, landline and WhatsApp as alternatives', () => {
    const aside = element.querySelector('.quote-aside')!;
    expect(aside.querySelector('a[href="tel:+393522456708"]')).toBeTruthy();
    expect(aside.querySelector('a[href="tel:+3908119634301"]')).toBeTruthy();
    expect(aside.querySelector('a[href^="https://wa.me/"]')).toBeTruthy();
  });
});
