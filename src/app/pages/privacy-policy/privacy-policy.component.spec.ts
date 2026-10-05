import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PrivacyPolicyComponent } from './privacy-policy.component';

describe('PrivacyPolicyComponent', () => {
  let component: PrivacyPolicyComponent;
  let fixture: ComponentFixture<PrivacyPolicyComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyComponent);
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
    expect(element.querySelector('a[href="mailto:vigilanzamesrl@outlook.com"]')).toBeTruthy();
  });

  it('should state the 12 months retention for contact requests', () => {
    expect(element.textContent).toContain('non oltre 12 mesi');
  });

  it('should link the cookie policy', () => {
    expect(element.querySelector('a[href="/cookie-policy"]')).toBeTruthy();
  });
});
