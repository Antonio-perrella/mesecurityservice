/** Short description of a service; the full text is on the Servizi page, in the section whose anchor is `id`. */
export interface ServiceSummary {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  summary: string;
}

export const SERVICE_CATALOG: ServiceSummary[] = [
  {
    id: 'servizi-fiduciari',
    icon: 'vpn_key',
    title: 'Servizi fiduciari',
    tagline: 'Presenza e controllo, ogni giorno.',
    summary: 'Portierato e custodia, reception e accoglienza, controllo accessi e servizi fiduciari temporanei.',
  },
  {
    id: 'vigilanza-non-armata',
    icon: 'shield',
    title: 'Vigilanza non armata',
    tagline: 'Presidio e prevenzione.',
    summary: 'La presenza di personale qualificato rappresenta un importante elemento di prevenzione e deterrenza.',
  },
  {
    id: 'presidio-fisso',
    icon: 'location_on',
    title: 'Presidio fisso',
    tagline: 'La sicurezza dove serve.',
    summary: 'Una presenza costante durante le fasce orarie concordate, anche su turnazioni continuative.',
  },
  {
    id: 'eventi-e-manifestazioni',
    icon: 'celebration',
    title: 'Eventi e manifestazioni',
    tagline: 'Professionalità al servizio del tuo evento.',
    summary: 'Eventi, fiere, manifestazioni, inaugurazioni e iniziative private richiedono organizzazione e controllo.',
  },
  {
    id: 'controllo-accessi',
    icon: 'how_to_reg',
    title: 'Controllo accessi e gestione flussi',
    tagline: 'Ordine, controllo e organizzazione.',
    summary: 'Gestiamo gli accessi pedonali e veicolari presso aziende, strutture commerciali, condomini, cantieri e aree private.',
  },
  {
    id: 'servizi-personalizzati',
    icon: 'tune',
    title: 'Servizi personalizzati',
    tagline: 'La tua esigenza, la nostra soluzione.',
    summary: 'Non esistono due clienti con le stesse necessità: costruiamo insieme il servizio più adatto alla tua realtà.',
  },
];
