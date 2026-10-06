import { Component, ElementRef, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { CONTACT_INFO, WHATSAPP_URL } from '../../../shared/contact-info';
import { FormMailService } from '../../../shared/form-mail.service';
import { SERVICE_CATALOG } from '../../../shared/service-catalog';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, RouterLink, MatIconModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  private readonly mail = inject(FormMailService);
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;

  readonly contact = CONTACT_INFO;
  readonly whatsappUrl = WHATSAPP_URL;
  readonly serviceOptions = [...SERVICE_CATALOG.map(service => service.title), 'Altro'];

  readonly form = inject(NonNullableFormBuilder).group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    company: ['', Validators.maxLength(100)],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
    phone: ['', [Validators.maxLength(30), Validators.pattern(/^[+\d\s()./-]*$/)]],
    service: [''],
    message: ['', [Validators.required, Validators.maxLength(3000)]],
    privacy: [false, Validators.requiredTrue],
    website: [''],
  });

  readonly status = signal<SendStatus>('idle');

  showError(name: string): boolean {
    const control = this.form.get(name)!;
    return control.invalid && control.touched;
  }

  submit(): void {
    if (this.status() === 'sending') {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const firstInvalid = Object.keys(this.form.controls).find(name => this.form.get(name)!.invalid);
      this.host.querySelector<HTMLElement>(`#cf-${firstInvalid}`)?.focus();
      return;
    }

    const { website, privacy, ...values } = this.form.getRawValue();

    if (website) {
      this.status.set('sent');
      this.form.reset();
      return;
    }

    this.status.set('sending');
    this.mail.send({
      subject: `Richiesta dal sito - ${values.name}`,
      replyTo: values.email,
      fields: {
        'Nome e cognome': values.name,
        'Azienda': values.company || '-',
        'Email': values.email,
        'Telefono': values.phone || '-',
        'Servizio di interesse': values.service || '-',
        'Messaggio': values.message,
      },
    }).subscribe({
      complete: () => {
        this.status.set('sent');
        this.form.reset();
      },
      error: () => this.status.set('error'),
    });
  }
}
