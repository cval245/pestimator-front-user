import {TestBed} from '@angular/core/testing';

import {IssueEstTempService} from './issue-est-temp.service';

describe('IssueEstTempService', () => {
  let service: IssueEstTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueEstTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
