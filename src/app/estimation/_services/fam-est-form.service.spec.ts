import { TestBed } from '@angular/core/testing';

import { FamEstFormService } from './fam-est-form.service';

describe('FamEstFormService', () => {
  let service: FamEstFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamEstFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
