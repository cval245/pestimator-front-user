import {TestBed} from '@angular/core/testing';

import {FamEstDetTotService} from './fam-est-det-tot.service';

describe('FamEstDetTotService', () => {
  let service: FamEstDetTotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamEstDetTotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
