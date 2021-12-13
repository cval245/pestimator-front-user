import {TestBed} from '@angular/core/testing';

import {AllowTransService} from './allow-trans.service';

describe('AllowTransService', () => {
  let service: AllowTransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllowTransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
