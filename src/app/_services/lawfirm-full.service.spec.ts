import {TestBed} from '@angular/core/testing';

import {LawfirmFullService} from './lawfirm-full.service';

describe('LawfirmFullService', () => {
  let service: LawfirmFullService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawfirmFullService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
