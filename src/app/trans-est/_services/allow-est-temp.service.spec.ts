import { TestBed } from '@angular/core/testing';

import { AllowEstTempService } from './allow-est-temp.service';

describe('AllowEstTempService', () => {
  let service: AllowEstTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllowEstTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
