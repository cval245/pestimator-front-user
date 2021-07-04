import { TestBed } from '@angular/core/testing';

import { FamEstDetailService } from './fam-est-detail.service';

describe('FamEstDetailService', () => {
  let service: FamEstDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamEstDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
