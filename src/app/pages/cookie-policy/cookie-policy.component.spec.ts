import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CookiePolicyComponent } from './cookie-policy.component';

describe('CookiePolicyComponent', () => {
  let component: CookiePolicyComponent;
  let fixture: ComponentFixture<CookiePolicyComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiePolicyComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiePolicyComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should name the data controller', () => {
    expect(element.textContent).toContain('M.E. Security Service Srl');
    expect(element.textContent).toContain('11075411212');
    expect(element.querySelector('a[href="mailto:vigilanzamesrl@pec.it"]')).toBeTruthy();
  });

  it('should open external links in a new tab', () => {
    const external = Array.from(element.querySelectorAll<HTMLAnchorElement>('a[href^="http"]'));
    expect(external.length).toBeGreaterThan(0);
    external.forEach(a => {
      expect(a.target).toBe('_blank');
      expect(a.rel).toContain('noopener');
    });
  });
});
