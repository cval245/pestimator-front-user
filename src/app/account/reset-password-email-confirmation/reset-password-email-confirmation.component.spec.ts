import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordEmailConfirmationComponent } from './reset-password-email-confirmation.component';

describe('ResetPasswordEmailConfirmationComponent', () => {
  let component: ResetPasswordEmailConfirmationComponent;
  let fixture: ComponentFixture<ResetPasswordEmailConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordEmailConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordEmailConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
