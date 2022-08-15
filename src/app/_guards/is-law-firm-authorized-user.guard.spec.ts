import {TestBed} from '@angular/core/testing';

import {IsLawFirmAuthorizedUserGuard} from './is-law-firm-authorized-user.guard';

describe('IsLawFirmAuthorizedUserGuard', () => {
  let guard: IsLawFirmAuthorizedUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsLawFirmAuthorizedUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
