import {TestBed} from '@angular/core/testing';

import {TransComplexTimeService} from './trans-complex-time.service';

describe('TransComplexTimeService', () => {
  let service: TransComplexTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransComplexTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
