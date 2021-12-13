import {TestBed} from '@angular/core/testing';

import {HomeProfileGuard} from './home-profile.guard';

describe('HomeProfileGuard', () => {
  let guard: HomeProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HomeProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
