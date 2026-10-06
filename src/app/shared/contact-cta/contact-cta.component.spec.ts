import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ContactCtaComponent } from './contact-cta.component';

describe('ContactCtaComponent', () => {
  let component: ContactCtaComponent;
  let fixture: ComponentFixture<ContactCtaComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactCtaComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactCtaComponent);
    fixture.componentRef.setInput('eyebrow', 'Contattaci');
    fixture.componentRef.setInput('heading', 'Titolo di prova');
    fixture.componentRef.setInput('lead', 'Testo di prova');
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the given texts', () => {
    expect(element.querySelector('.section-eyebrow')!.textContent).toContain('Contattaci');
    expect(element.querySelector('h2')!.textContent).toContain('Titolo di prova');
    expect(element.querySelector('.section-lead')!.textContent).toContain('Testo di prova');
  });

  it('should link to the quote page, phone and WhatsApp', () => {
    expect(element.querySelector('a[href="/preventivo"]')).toBeTruthy();
    expect(element.querySelector('a[href="tel:+393522456708"]')).toBeTruthy();

    const whatsapp = element.querySelector<HTMLAnchorElement>('.cta-btn--whatsapp')!;
    expect(whatsapp.href).toContain('https://wa.me/393522456708');
    expect(whatsapp.target).toBe('_blank');
  });
});
