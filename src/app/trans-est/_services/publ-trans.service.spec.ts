import {TestBed} from '@angular/core/testing';

import {PublTransService} from './publ-trans.service';

describe('PublTransService', () => {
  let service: PublTransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublTransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
