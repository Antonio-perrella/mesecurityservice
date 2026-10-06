import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SERVICE_CATALOG } from '../../shared/service-catalog';
import { ServiziComponent } from './servizi.component';

describe('ServiziComponent', () => {
  let component: ServiziComponent;
  let fixture: ComponentFixture<ServiziComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiziComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiziComponent);
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

  // The home page links to these anchors: a renamed section id would break those links
  it('should have a section for every service of the catalog', () => {
    SERVICE_CATALOG.forEach(service => expect(element.querySelector(`#${service.id}`)).withContext(service.id).toBeTruthy());
  });

  it('should link every section from the page header', () => {
    const links = Array.from(element.querySelectorAll('.service-nav a')).map(a => a.getAttribute('href'));
    expect(links).toEqual(SERVICE_CATALOG.map(service => `/servizi#${service.id}`));
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

  it('should end with the contact call to action', () => {
    expect(element.querySelector('app-contact-cta a[href="/preventivo"]')).toBeTruthy();
  });

  it('should give every image an alt text', () => {
    element.querySelectorAll('img').forEach(img => expect(img.alt.trim()).not.toBe(''));
  });
});
