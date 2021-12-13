import {TestBed} from '@angular/core/testing';

import {OaEstTempService} from './oa-est-temp.service';

describe('OaEstTempService', () => {
  let service: OaEstTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OaEstTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
