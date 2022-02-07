import {TestBed} from '@angular/core/testing';

import {DetailedFeeCategoryService} from './detailed-fee-category.service';

describe('DetailedFeeCategoryService', () => {
  let service: DetailedFeeCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailedFeeCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
