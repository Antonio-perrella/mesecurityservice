export const CONTACT_INFO = {
  companyName: 'M.E. Security Service Srl',
  vatNumber: '11075411212',
  address: 'Via Napoli 38, Chiaiano (NA)',
  mapsQuery: 'VIGILANZA M.E.SECURITY SERVICE SRL, Via Napoli, 38, 80145 Napoli NA',
  pec: 'vigilanzamesrl@pec.it',
  email: 'vigilanzamesrl@outlook.com',
  phone: '352 245 6708',
  phoneHref: 'tel:+393522456708',
  landline: '081 1963 4301',
  landlineHref: 'tel:+3908119634301',
  whatsappNumber: '393522456708',
  whatsappMessage: 'Buongiorno, vorrei ricevere informazioni sui vostri servizi.',
  facebookUrl: 'https://www.facebook.com/share/1XfDjW8W6m/',
  instagramUrl: 'https://www.instagram.com/m.e.security_service_srl/',
} as const;

export const WHATSAPP_URL =
  `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(CONTACT_INFO.whatsappMessage)}`;

export const GOOGLE_MAPS_URL =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.mapsQuery)}`;

export const GOOGLE_MAPS_EMBED_URL =
  `https://maps.google.com/maps?q=${encodeURIComponent(CONTACT_INFO.mapsQuery)}&z=16&output=embed`;

const FORM_MAIL_RECIPIENT = CONTACT_INFO.email;

export const FORM_MAIL_ENDPOINT = `https://formsubmit.co/ajax/${FORM_MAIL_RECIPIENT}`;
