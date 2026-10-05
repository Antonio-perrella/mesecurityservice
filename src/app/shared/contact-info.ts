export const CONTACT_INFO = {
  companyName: 'M.E. Security Service Srl',
  vatNumber: '11075411212',
  address: 'Via Napoli a Chiaiano 38 (NA)',
  pec: 'vigilanzamesrl@pec.it',
  email: 'vigilanzamesrl@outlook.com',
  phone: '352 245 6708',
  phoneHref: 'tel:+393522456708',
  whatsappNumber: '393522456708',
  whatsappMessage: 'Buongiorno, vorrei ricevere informazioni sui vostri servizi.',
  facebookUrl: 'https://www.facebook.com/share/1XfDjW8W6m/',
  instagramUrl: 'https://www.instagram.com/m.e.security_service_srl/',
} as const;

export const WHATSAPP_URL =
  `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`;
