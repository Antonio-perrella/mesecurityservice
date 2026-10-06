import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ContactCtaComponent } from '../../shared/contact-cta/contact-cta.component';
import { CONTACT_INFO } from '../../shared/contact-info';

interface Value {
  icon: string;
  title: string;
  text: string;
}

interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** CSS object-position, to keep the subject inside the square tile */
  focus?: string;
}

@Component({
  selector: 'app-chi-siamo',
  imports: [MatIconModule, ContactCtaComponent],
  templateUrl: './chi-siamo.component.html',
  styleUrl: './chi-siamo.component.scss'
})
export class ChiSiamoComponent {
  readonly contact = CONTACT_INFO;

  readonly values: Value[] = [
    {
      icon: 'military_tech',
      title: 'Eccellenza operativa',
      text: 'Ogni servizio è organizzato con metodo, procedure chiare e attenzione ai dettagli.',
    },
    {
      icon: 'workspace_premium',
      title: 'Professionalità',
      text: 'Personale selezionato e orientato al rispetto delle procedure e delle esigenze del cliente.',
    },
    {
      icon: 'lightbulb',
      title: 'Innovazione',
      text: 'Cerchiamo sempre il modo più efficace di organizzare il servizio e di rispondere alle nuove esigenze.',
    },
    {
      icon: 'privacy_tip',
      title: 'Discrezione',
      text: 'Una presenza riservata e attenta, che si integra con le attività quotidiane della struttura.',
    },
    {
      icon: 'bolt',
      title: 'Capacità nel governare gli imprevisti',
      text: 'Prontezza nel gestire le situazioni impreviste e nel segnalare tempestivamente ogni anomalia.',
    },
  ];

  readonly gallery: GalleryPhoto[] = [
    {
      src: 'assets/images/team-servizio-evento.jpg',
      alt: 'Operatori M.E. Security Service con le giacche di servizio durante una manifestazione',
      caption: 'Giacche di servizio',
      width: 1169,
      height: 1170,
      focus: 'left center',
    },
    {
      src: 'assets/images/divisa-gilet.jpg',
      alt: 'Gilet operativo nero con il logo M.E. Security Service',
      caption: 'Gilet operativo',
      width: 739,
      height: 986,
    },
    {
      src: 'assets/images/divisa-cappellino.jpg',
      alt: 'Cappellino nero con il logo M.E. Security Service',
      caption: 'Cappellino',
      width: 739,
      height: 986,
    },
    {
      src: 'assets/images/auto-servizio.jpg',
      alt: 'Auto di servizio M.E. Security Service con le portiere aperte',
      caption: 'Auto di servizio',
      width: 739,
      height: 333,
    },
  ];
}
