import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { WHATSAPP_ICON } from '../../shared/brand-icons';
import { CONTACT_INFO, GOOGLE_MAPS_EMBED_URL, GOOGLE_MAPS_URL, WHATSAPP_URL } from '../../shared/contact-info';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-contatti',
  imports: [RouterLink, MatIconModule, ContactFormComponent],
  templateUrl: './contatti.component.html',
  styleUrl: './contatti.component.scss'
})
export class ContattiComponent {
  readonly contact = CONTACT_INFO;
  readonly whatsappUrl = WHATSAPP_URL;
  readonly whatsappIcon = WHATSAPP_ICON;
  readonly mapsUrl = GOOGLE_MAPS_URL;
  readonly mapEmbedUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(GOOGLE_MAPS_EMBED_URL);
  readonly mapConsent = signal(false);
}
