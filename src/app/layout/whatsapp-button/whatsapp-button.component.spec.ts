import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappButtonComponent } from './whatsapp-button.component';

describe('WhatsappButtonComponent', () => {
  let component: WhatsappButtonComponent;
  let fixture: ComponentFixture<WhatsappButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatsappButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the WhatsApp chat in a new tab', () => {
    const link = (fixture.nativeElement as HTMLElement).querySelector('a')!;
    expect(link.href).toMatch(/^https:\/\/wa\.me\/393522456708\?text=/);
    expect(link.target).toBe('_blank');
    expect(link.rel).toContain('noopener');
  });
});
