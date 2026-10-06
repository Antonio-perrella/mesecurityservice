import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { FORM_MAIL_ENDPOINT } from './contact-info';

export interface FormMail {
  subject: string;
  /** Address the reply goes to when the email is answered */
  replyTo: string;
  /** Shown in the email as a table, one row per entry: keys are the labels */
  fields: Record<string, string>;
}

interface FormSubmitResponse {
  success: string | boolean;
  message?: string;
}

/** Sends a website form to the company mailbox through FormSubmit */
@Injectable({ providedIn: 'root' })
export class FormMailService {
  private readonly http = inject(HttpClient);

  send(mail: FormMail): Observable<void> {
    const body = {
      ...mail.fields,
      _subject: mail.subject,
      _replyto: mail.replyTo,
      _template: 'table',
      _captcha: 'false',
    };

    return this.http.post<FormSubmitResponse>(FORM_MAIL_ENDPOINT, body, {
      headers: { Accept: 'application/json' },
    }).pipe(
      // FormSubmit can answer 200 with success "false" (e.g. mailbox not activated yet)
      map(response => {
        if (String(response.success) !== 'true') {
          throw new Error(response.message || 'Invio non riuscito');
        }
      }),
    );
  }
}
