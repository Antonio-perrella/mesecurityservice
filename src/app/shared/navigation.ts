export interface NavItem {
  label: string;
  path: string;
}

export const MENU_ITEMS: NavItem[] = [
  { label: 'Servizi', path: '/servizi' },
  { label: 'Chi siamo', path: '/chi-siamo' },
  { label: 'Contatti', path: '/contatti' },
];

export const QUOTE_ITEM: NavItem = { label: 'Preventivo', path: '/preventivo' };
