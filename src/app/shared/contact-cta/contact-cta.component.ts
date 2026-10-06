import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { WHATSAPP_ICON } from '../brand-icons';
import { CONTACT_INFO, WHATSAPP_URL } from '../contact-info';
import { QUOTE_ITEM } from '../navigation';

/** Closing call-to-action band: quote request, phone call and WhatsApp. Extra content is projected below the buttons. */
@Component({
  selector: 'app-contact-cta',
  imports: [RouterLink, MatIconModule],
  templateUrl: './contact-cta.component.html',
  styleUrl: './contact-cta.component.scss'
})
export class ContactCtaComponent {
  readonly eyebrow = input.required<string>();
  readonly heading = input.required<string>();
  readonly lead = input.required<string>();

  readonly contact = CONTACT_INFO;
  readonly whatsappUrl = WHATSAPP_URL;
  readonly whatsappIcon = WHATSAPP_ICON;
  readonly quoteItem = QUOTE_ITEM;
}
