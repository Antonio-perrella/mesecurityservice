import { Component, ElementRef, inject, signal } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { WHATSAPP_ICON } from '../../shared/brand-icons';
import { CONTACT_INFO, WHATSAPP_URL } from '../../shared/contact-info';
import { FormMailService } from '../../shared/form-mail.service';
import { SERVICE_CATALOG } from '../../shared/service-catalog';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

interface QuoteOption {
  id: string;
  icon: string;
  title: string;
}

interface QuoteGroup {
  title: string;
  options: QuoteOption[];
}

const QUOTE_GROUPS: QuoteGroup[] = [
  {
    title: 'Servizi fiduciari',
    options: [
      { id: 'portierato-custodia', icon: 'vpn_key', title: 'Portierato e custodia' },
      { id: 'reception-accoglienza', icon: 'support_agent', title: 'Reception e accoglienza' },
      { id: 'controllo-accessi-fiduciario', icon: 'badge', title: 'Controllo accessi' },
      { id: 'fiduciari-temporanei', icon: 'event_available', title: 'Servizi fiduciari temporanei' },
    ],
  },
  {
    title: 'Altri servizi',
    options: SERVICE_CATALOG
      .filter(service => service.id !== 'servizi-fiduciari')
      .map(({ id, icon, title }) => ({ id, icon, title })),
  },
];

const QUOTE_OPTIONS = QUOTE_GROUPS.flatMap(group => group.options);

function atLeastOneSelected(group: AbstractControl): ValidationErrors | null {
  return Object.values(group.value as Record<string, boolean>).some(Boolean) ? null : { required: true };
}

@Component({
  selector: 'app-preventivo',
  imports: [ReactiveFormsModule, RouterLink, MatIconModule],
  templateUrl: './preventivo.component.html',
  styleUrl: './preventivo.component.scss'
})
export class PreventivoComponent {
  private readonly mail = inject(FormMailService);
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  private readonly fb = inject(NonNullableFormBuilder);

  readonly contact = CONTACT_INFO;
  readonly whatsappUrl = WHATSAPP_URL;
  readonly whatsappIcon = WHATSAPP_ICON;
  readonly groups = QUOTE_GROUPS;

  readonly form = this.fb.group({
    services: this.fb.group(
      Object.fromEntries(QUOTE_OPTIONS.map(option => [option.id, false])),
      { validators: atLeastOneSelected },
    ),
    notes: ['', Validators.maxLength(3000)],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    company: ['', Validators.maxLength(100)],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
    phone: ['', [Validators.maxLength(30), Validators.pattern(/^[+\d\s()./-]*$/)]],
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
      this.host.querySelector<HTMLElement>(`#qf-${firstInvalid}:is(input, textarea), #qf-${firstInvalid} input`)?.focus();
      return;
    }

    const { website, privacy, services, ...values } = this.form.getRawValue();

    if (website) {
      this.status.set('sent');
      this.form.reset();
      return;
    }

    this.status.set('sending');
    this.mail.send({
      subject: `Richiesta di preventivo - ${values.name}`,
      replyTo: values.email,
      fields: {
        'Nome e cognome': values.name,
        'Azienda': values.company || '-',
        'Email': values.email,
        'Telefono': values.phone || '-',
        'Servizi richiesti': QUOTE_OPTIONS.filter(option => services[option.id]).map(option => option.title).join(', '),
        'Note': values.notes || '-',
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
