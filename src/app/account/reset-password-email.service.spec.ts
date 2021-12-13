import {TestBed} from '@angular/core/testing';

import {ResetPasswordEmailService} from './reset-password-email.service';

describe('ResetPasswordEmailService', () => {
  let service: ResetPasswordEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
