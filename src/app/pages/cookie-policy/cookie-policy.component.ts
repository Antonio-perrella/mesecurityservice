import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CONTACT_INFO } from '../../shared/contact-info';

@Component({
  selector: 'app-cookie-policy',
  imports: [RouterLink],
  templateUrl: './cookie-policy.component.html',
  styleUrl: './cookie-policy.component.scss'
})
export class CookiePolicyComponent {
  readonly contact = CONTACT_INFO;
}
