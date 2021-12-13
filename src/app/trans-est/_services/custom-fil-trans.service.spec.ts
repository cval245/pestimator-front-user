import {TestBed} from '@angular/core/testing';

import {CustomFilTransService} from './custom-fil-trans.service';

describe('CustomFilTransService', () => {
  let service: CustomFilTransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomFilTransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
