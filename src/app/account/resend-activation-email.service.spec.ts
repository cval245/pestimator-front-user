import { TestBed } from '@angular/core/testing';

import { ResendActivationEmailService } from './resend-activation-email.service';

describe('ResendActivationEmailService', () => {
  let service: ResendActivationEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResendActivationEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
