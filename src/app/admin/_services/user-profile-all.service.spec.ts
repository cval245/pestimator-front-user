import {TestBed} from '@angular/core/testing';

import {UserProfileAllService} from './user-profile-all.service';

describe('UserProfileAllService', () => {
  let service: UserProfileAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
