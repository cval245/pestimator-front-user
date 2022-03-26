import {TestBed} from '@angular/core/testing';

import {LawFirmImageService} from './law-firm-image.service';

describe('LawFirmImageService', () => {
  let service: LawFirmImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawFirmImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
