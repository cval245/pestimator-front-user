import { TestBed } from '@angular/core/testing';

import { ApplDetailService } from './appl-detail.service';

describe('ApplDetailService', () => {
  let service: ApplDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
