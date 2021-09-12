import {TestBed} from '@angular/core/testing';

import {ComplexConditionsService} from './complex-conditions.service';

describe('ComplexConditionsService', () => {
  let service: ComplexConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplexConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
