import {TestBed} from '@angular/core/testing';

import {TranslationRequiredOptionsService} from './translation-required-options.service';

describe('TranslationRequiredOptionsService', () => {
  let service: TranslationRequiredOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationRequiredOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
