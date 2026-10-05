import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { FACEBOOK_ICON, INSTAGRAM_ICON, WHATSAPP_ICON } from '../../shared/brand-icons';
import { CONTACT_INFO, WHATSAPP_URL } from '../../shared/contact-info';
import { MENU_ITEMS, QUOTE_ITEM } from '../../shared/navigation';

interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly contact = CONTACT_INFO;
  readonly whatsappUrl = WHATSAPP_URL;
  readonly whatsappIcon = WHATSAPP_ICON;
  readonly menuItems = [...MENU_ITEMS, QUOTE_ITEM];
  readonly socialLinks: SocialLink[] = [
    { label: 'Facebook', url: CONTACT_INFO.facebookUrl, icon: FACEBOOK_ICON },
    { label: 'Instagram', url: CONTACT_INFO.instagramUrl, icon: INSTAGRAM_ICON },
  ];
  readonly year = new Date().getFullYear();
}
