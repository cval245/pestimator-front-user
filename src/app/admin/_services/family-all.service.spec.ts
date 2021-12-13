import {TestBed} from '@angular/core/testing';

import {FamilyAllServiceService} from './family-all-service.service';

describe('FamilyAllServiceService', () => {
  let service: FamilyAllServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyAllServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
