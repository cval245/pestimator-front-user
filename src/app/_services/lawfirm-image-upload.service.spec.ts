import {TestBed} from '@angular/core/testing';

import {LawfirmImageUploadService} from './lawfirm-image-upload.service';

describe('LawfirmImageUploadService', () => {
  let service: LawfirmImageUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawfirmImageUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
