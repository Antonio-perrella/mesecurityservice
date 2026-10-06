import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { ContactCtaComponent } from '../../shared/contact-cta/contact-cta.component';
import { CONTACT_INFO } from '../../shared/contact-info';
import { QUOTE_ITEM } from '../../shared/navigation';
import { SERVICE_CATALOG } from '../../shared/service-catalog';

interface IconLabel {
  icon: string;
  label: string;
}

interface Reason {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatIconModule, ContactCtaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly contact = CONTACT_INFO;
  readonly quoteItem = QUOTE_ITEM;

  readonly sectors: IconLabel[] = [
    { icon: 'business', label: 'Aziende' },
    { icon: 'storefront', label: 'Attività commerciali' },
    { icon: 'apartment', label: 'Condomini' },
    { icon: 'construction', label: 'Cantieri' },
    { icon: 'home_work', label: 'Strutture private' },
    { icon: 'celebration', label: 'Eventi' },
  ];

  readonly schedules: IconLabel[] = [
    { icon: 'autorenew', label: 'Continuativi' },
    { icon: 'date_range', label: 'Temporanei' },
    { icon: 'wb_sunny', label: 'Diurni' },
    { icon: 'bedtime', label: 'Notturni' },
    { icon: 'schedule', label: 'Su specifiche fasce orarie' },
  ];

  readonly services = SERVICE_CATALOG;

  readonly reasons: Reason[] = [
    { icon: 'verified_user', title: 'Affidabilità', text: 'Un servizio organizzato con attenzione e continuità.' },
    { icon: 'workspace_premium', title: 'Professionalità', text: 'Personale selezionato e orientato al rispetto delle procedure e delle esigenze del cliente.' },
    { icon: 'schedule', title: 'Flessibilità', text: 'Servizi continuativi o temporanei, organizzati in base alle reali necessità.' },
    { icon: 'person_pin_circle', title: 'Presenza', text: 'Un punto di riferimento operativo direttamente presso la struttura.' },
    { icon: 'tune', title: 'Personalizzazione', text: 'Ogni servizio viene definito sulla base delle caratteristiche e delle esigenze specifiche del cliente.' },
  ];
}
