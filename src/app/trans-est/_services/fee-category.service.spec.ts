import {TestBed} from '@angular/core/testing';

import {FeeCategoryService} from './fee-category.service';

describe('FeeCategoryService', () => {
  let service: FeeCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
