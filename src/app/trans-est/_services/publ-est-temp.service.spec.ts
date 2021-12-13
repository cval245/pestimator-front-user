import {TestBed} from '@angular/core/testing';

import {PublEstTempService} from './publ-est-temp.service';

describe('PublEstTempService', () => {
  let service: PublEstTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublEstTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
