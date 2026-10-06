import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MENU_ITEMS, QUOTE_ITEM } from '../../shared/navigation';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class HeaderComponent {
  readonly menuItems = MENU_ITEMS;
  readonly quoteItem = QUOTE_ITEM;

  readonly menuOpen = signal(false);

  constructor() {
    // The header is sticky: links to an anchor (e.g. /servizi#presidio-fisso) must stop below it, not under it
    const host: HTMLElement = inject(ElementRef).nativeElement;
    inject(ViewportScroller).setOffset(() => [0, host.offsetHeight + 16]);

    // Bootstrap "md" breakpoint: from here up the desktop menu is visible, so the mobile one must not stay open
    inject(BreakpointObserver)
      .observe('(min-width: 768px)')
      .pipe(takeUntilDestroyed())
      .subscribe(({ matches }) => {
        if (matches) {
          this.closeMenu();
        }
      });
  }

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
