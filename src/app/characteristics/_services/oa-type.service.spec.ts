import {TestBed} from '@angular/core/testing';

import {OaTypeService} from './oa-type.service';

describe('OaTypeService', () => {
  let service: OaTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OaTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
