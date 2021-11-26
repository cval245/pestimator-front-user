import { TestBed } from '@angular/core/testing';

import { RequestExamTransService } from './request-exam-trans.service';

describe('RequestExamTransService', () => {
  let service: RequestExamTransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestExamTransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
