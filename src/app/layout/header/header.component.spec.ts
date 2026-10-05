import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let element: HTMLElement;

  const burger = () => element.querySelector<HTMLButtonElement>('.burger')!;
  const mobileNav = () => element.querySelector<HTMLElement>('#mobile-menu')!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all menu entries', () => {
    const labels = Array.from(element.querySelectorAll('.desktop-nav a')).map(a => a.textContent?.trim());
    expect(labels).toEqual(['Servizi', 'Chi siamo', 'Contatti', 'Preventivo']);
  });

  it('should toggle the mobile menu from the burger button', () => {
    expect(burger().getAttribute('aria-expanded')).toBe('false');
    expect(mobileNav().hasAttribute('inert')).toBeTrue();

    burger().click();
    fixture.detectChanges();

    expect(burger().getAttribute('aria-expanded')).toBe('true');
    expect(mobileNav().classList).toContain('open');
    expect(mobileNav().hasAttribute('inert')).toBeFalse();

    burger().click();
    fixture.detectChanges();

    expect(burger().getAttribute('aria-expanded')).toBe('false');
  });

  it('should close the mobile menu when a link is clicked', () => {
    component.menuOpen.set(true);
    fixture.detectChanges();

    element.querySelector<HTMLAnchorElement>('.mobile-link')!.click();
    fixture.detectChanges();

    expect(component.menuOpen()).toBeFalse();
  });

  it('should close the mobile menu on Escape', () => {
    component.menuOpen.set(true);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(component.menuOpen()).toBeFalse();
  });
});
