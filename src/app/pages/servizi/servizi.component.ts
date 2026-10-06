import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { ContactCtaComponent } from '../../shared/contact-cta/contact-cta.component';
import { SERVICE_CATALOG } from '../../shared/service-catalog';

interface ServiceCard {
  icon: string;
  title: string;
  paragraphs: string[];
  highlight?: string;
}

@Component({
  selector: 'app-servizi',
  imports: [RouterLink, MatIconModule, ContactCtaComponent],
  templateUrl: './servizi.component.html',
  styleUrl: './servizi.component.scss'
})
export class ServiziComponent {
  readonly services = SERVICE_CATALOG;

  readonly fiduciaryServices: ServiceCard[] = [
    {
      icon: 'vpn_key',
      title: 'Portierato e custodia',
      paragraphs: [
        'Un servizio pensato per garantire una presenza costante all’interno della struttura, contribuendo alla gestione ordinata degli accessi e delle attività quotidiane.',
        'Il personale può occuparsi del controllo degli ingressi e delle uscite, della gestione dei visitatori, della custodia delle chiavi e della segnalazione di eventuali anomalie.',
      ],
      highlight: 'Professionalità, discrezione e attenzione sono alla base del servizio.',
    },
    {
      icon: 'support_agent',
      title: 'Reception e accoglienza',
      paragraphs: [
        'La prima impressione conta.',
        'Il nostro personale può essere impiegato presso reception, ingressi aziendali, strutture commerciali e sedi direzionali per accogliere visitatori, clienti e fornitori e fornire supporto nella gestione degli accessi.',
      ],
      highlight: 'Un servizio che unisce accoglienza, ordine e controllo.',
    },
    {
      icon: 'badge',
      title: 'Controllo accessi',
      paragraphs: [
        'Il controllo degli accessi consente di gestire in modo ordinato e sicuro l’ingresso e l’uscita di persone, dipendenti, fornitori e mezzi.',
        'Il servizio viene organizzato secondo le procedure stabilite dal cliente e può prevedere registrazione degli accessi, verifica delle autorizzazioni e gestione dei flussi.',
      ],
    },
    {
      icon: 'event_available',
      title: 'Servizi fiduciari temporanei',
      paragraphs: [
        'Quando la necessità è temporanea, la nostra organizzazione si adatta.',
        'Offriamo servizi fiduciari per periodi limitati, sostituzioni, aperture straordinarie, cantieri, eventi, manifestazioni, periodi di maggiore affluenza o specifiche esigenze aziendali.',
      ],
      highlight: 'Flessibilità e rapidità per rispondere anche alle esigenze impreviste.',
    },
  ];

  readonly guardingActivities: string[] = [
    'Presidio fisso',
    'Controllo degli accessi',
    'Controllo delle aree interne ed esterne',
    'Sorveglianza della struttura',
    'Controllo dei flussi di persone e mezzi',
    'Verifica delle procedure di ingresso e uscita',
    'Segnalazione di anomalie e situazioni di rischio',
    'Compilazione dei rapporti di servizio',
  ];
}
