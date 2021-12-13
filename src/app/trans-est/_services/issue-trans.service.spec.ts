import {TestBed} from '@angular/core/testing';

import {IssueTransService} from './issue-trans.service';

describe('IssueTransService', () => {
  let service: IssueTransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueTransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
