import {TestBed} from '@angular/core/testing';

import {ResetPasswordEmailConfirmationService} from './reset-password-email-confirmation.service';

describe('ResetPasswordEmailConfirmationService', () => {
  let service: ResetPasswordEmailConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordEmailConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
