import { TestBed } from '@angular/core/testing';

import { ApplTypeService } from './appl-type.service';

describe('ApplTypeService', () => {
  let service: ApplTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
