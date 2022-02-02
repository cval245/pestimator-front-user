import {TestBed} from '@angular/core/testing';

import {PlatformIdService} from './platform-id.service';

describe('PlatformIdService', () => {
  let service: PlatformIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatformIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
