import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ChiSiamoComponent } from './chi-siamo.component';

describe('ChiSiamoComponent', () => {
  let component: ChiSiamoComponent;
  let fixture: ComponentFixture<ChiSiamoComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiSiamoComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiSiamoComponent);
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

  it('should show the company values', () => {
    const titles = Array.from(element.querySelectorAll('.value-title')).map(h => h.textContent!.trim());
    expect(titles).toEqual([
      'Eccellenza operativa',
      'Professionalità',
      'Innovazione',
      'Discrezione',
      'Capacità nel governare gli imprevisti',
    ]);
  });

  it('should show the office address', () => {
    expect(element.querySelector('.office figcaption')!.textContent).toContain('Via Napoli a Chiaiano 38 (NA)');
  });

  it('should end with the contact call to action', () => {
    expect(element.querySelector('app-contact-cta a[href="/preventivo"]')).toBeTruthy();
  });

  it('should give every image an alt text', () => {
    element.querySelectorAll('img').forEach(img => expect(img.alt.trim()).not.toBe(''));
  });
});
