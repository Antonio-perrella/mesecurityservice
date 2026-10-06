import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ContattiComponent } from './contatti.component';

describe('ContattiComponent', () => {
  let component: ContattiComponent;
  let fixture: ComponentFixture<ContattiComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContattiComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContattiComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a single h1', () => {
    expect(element.querySelectorAll('h1').length).toBe(1);
  });

  it('should list phones, WhatsApp, email, PEC and address', () => {
    const list = element.querySelector('.contact-list')!;
    expect(list.querySelector('a[href="tel:+393522456708"]')).toBeTruthy();
    expect(list.querySelector('a[href="tel:+3908119634301"]')).toBeTruthy();
    expect(list.querySelector('a[href^="https://wa.me/393522456708"]')).toBeTruthy();
    expect(list.querySelector('a[href="mailto:vigilanzamesrl@outlook.com"]')).toBeTruthy();
    expect(list.querySelector('a[href="mailto:vigilanzamesrl@pec.it"]')).toBeTruthy();
    expect(list.textContent).toContain('Via Napoli 38, Chiaiano (NA)');
  });

  it('should contain the contact form', () => {
    expect(element.querySelector('app-contact-form form')).toBeTruthy();
  });

  // Required by the Cookie Policy: no request to Google before consent
  it('should not load Google Maps before the visitor clicks "Mostra mappa"', () => {
    expect(element.querySelector('iframe')).toBeNull();
  });

  it('should load Google Maps after the click', () => {
    const button = Array.from(element.querySelectorAll('button')).find(b => b.textContent!.includes('Mostra mappa'))!;
    button.click();
    fixture.detectChanges();

    const iframe = element.querySelector('iframe')!;
    expect(iframe.src).toContain('https://maps.google.com/maps?q=');
    expect(iframe.title).toContain('Mappa');
  });
});
