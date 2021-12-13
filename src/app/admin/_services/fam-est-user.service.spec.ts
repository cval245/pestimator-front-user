import {TestBed} from '@angular/core/testing';

import {FamEstUserService} from './fam-est-user.service';

describe('FamEstUserService', () => {
  let service: FamEstUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamEstUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
