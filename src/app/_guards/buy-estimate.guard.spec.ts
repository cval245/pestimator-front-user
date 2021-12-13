import {TestBed} from '@angular/core/testing';

import {BuyEstimateGuard} from './buy-estimate.guard';

describe('BuyEstimateGuard', () => {
  let guard: BuyEstimateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BuyEstimateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
