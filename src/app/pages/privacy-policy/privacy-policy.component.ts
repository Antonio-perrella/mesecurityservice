import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CONTACT_INFO } from '../../shared/contact-info';

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  readonly contact = CONTACT_INFO;
}
