import {TestBed} from '@angular/core/testing';

import {ApplTypeAllService} from './appl-type-all.service';

describe('ApplTypeAllService', () => {
  let service: ApplTypeAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplTypeAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
