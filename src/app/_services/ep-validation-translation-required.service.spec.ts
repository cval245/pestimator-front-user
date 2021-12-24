import {TestBed} from '@angular/core/testing';

import {EpValidationTranslationRequiredService} from './ep-validation-translation-required.service';

describe('EpValidationTranslationRequiredService', () => {
  let service: EpValidationTranslationRequiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpValidationTranslationRequiredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
