import {TestBed} from '@angular/core/testing';

import {ComplexTimeConditionsService} from './complex-time-conditions.service';

describe('ComplexTimeConditionsService', () => {
  let service: ComplexTimeConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplexTimeConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
