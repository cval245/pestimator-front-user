import {TestBed} from '@angular/core/testing';

import {OaTransService} from './oa-trans.service';

describe('OaTransService', () => {
  let service: OaTransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OaTransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
