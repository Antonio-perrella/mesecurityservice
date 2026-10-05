import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the company data', () => {
    const text = element.querySelector('.company-data')!.textContent!;
    expect(text).toContain('M.E. Security Service Srl');
    expect(text).toContain('11075411212');
    expect(text).toContain('Via Napoli a Chiaiano 38 (NA)');
    expect(element.querySelector('a[href="mailto:vigilanzamesrl@pec.it"]')).toBeTruthy();
  });

  it('should link phone and email', () => {
    expect(element.querySelector('a[href="tel:+393522456708"]')).toBeTruthy();
    expect(element.querySelector('a[href="mailto:vigilanzamesrl@outlook.com"]')).toBeTruthy();
  });

  it('should open social profiles in a new tab', () => {
    const socials = Array.from(element.querySelectorAll<HTMLAnchorElement>('.social-link'));
    expect(socials.map(a => a.getAttribute('aria-label'))).toEqual(['Facebook', 'Instagram']);
    socials.forEach(a => expect(a.target).toBe('_blank'));
  });

  it('should link the legal pages', () => {
    const legal = Array.from(element.querySelectorAll<HTMLAnchorElement>('.legal-nav a')).map(a => a.getAttribute('href'));
    expect(legal).toEqual(['/privacy-policy', '/cookie-policy']);
  });
});
