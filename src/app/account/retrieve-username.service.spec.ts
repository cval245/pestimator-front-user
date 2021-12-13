import {TestBed} from '@angular/core/testing';

import {RetrieveUsernameService} from './retrieve-username.service';

describe('RetrieveUsernameService', () => {
  let service: RetrieveUsernameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrieveUsernameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
