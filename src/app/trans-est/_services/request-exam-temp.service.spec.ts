import { TestBed } from '@angular/core/testing';

import { RequestExamTempService } from './request-exam-temp.service';

describe('RequestExamTempService', () => {
  let service: RequestExamTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestExamTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
