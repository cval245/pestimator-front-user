import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateEmailSentComponent } from './activate-email-sent.component';

describe('ActivateEmailSentComponent', () => {
  let component: ActivateEmailSentComponent;
  let fixture: ComponentFixture<ActivateEmailSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateEmailSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateEmailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
