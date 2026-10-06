import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
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

  it('should list the fiduciary services', () => {
    const titles = Array.from(element.querySelectorAll('.service-title')).map(h => h.textContent!.trim());
    expect(titles).toContain('Portierato e custodia');
    expect(titles).toContain('Reception e accoglienza');
    expect(titles).toContain('Controllo accessi');
    expect(titles).toContain('Servizi fiduciari temporanei');
  });

  it('should list the unarmed guarding activities', () => {
    expect(element.querySelectorAll('.check-list li').length).toBe(8);
  });

  it('should show the five reasons to choose us', () => {
    expect(element.querySelectorAll('.reason').length).toBe(5);
  });

  it('should link to the quote page, phone and WhatsApp', () => {
    const quoteLinks = element.querySelectorAll('a[href="/preventivo"]');
    expect(quoteLinks.length).toBe(2);
    expect(element.querySelector('a[href="tel:+393522456708"]')).toBeTruthy();

    const whatsapp = element.querySelector<HTMLAnchorElement>('.cta-btn--whatsapp')!;
    expect(whatsapp.href).toContain('https://wa.me/393522456708');
    expect(whatsapp.target).toBe('_blank');
  });

  it('should give every image an alt text', () => {
    element.querySelectorAll('img').forEach(img => expect(img.alt.trim()).not.toBe(''));
  });
});
