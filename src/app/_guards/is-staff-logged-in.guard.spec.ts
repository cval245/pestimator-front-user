import {TestBed} from '@angular/core/testing';

import {IsStaffLoggedInGuard} from './is-staff-logged-in.guard';

describe('IsStaffLoggedInGuard', () => {
  let guard: IsStaffLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsStaffLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
