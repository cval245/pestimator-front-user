import { TestBed } from '@angular/core/testing';

import { TransFilingRequirementsService } from './trans-filing-requirements.service';

describe('TransFilingRequirementsService', () => {
  let service: TransFilingRequirementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransFilingRequirementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
