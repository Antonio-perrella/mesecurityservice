import { Component } from '@angular/core';

import { WHATSAPP_ICON } from '../../shared/brand-icons';
import { WHATSAPP_URL } from '../../shared/contact-info';

@Component({
  selector: 'app-whatsapp-button',
  imports: [],
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.scss'
})
export class WhatsappButtonComponent {
  readonly whatsappUrl = WHATSAPP_URL;
  readonly whatsappIcon = WHATSAPP_ICON;
}
