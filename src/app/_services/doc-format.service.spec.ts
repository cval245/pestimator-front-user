import {TestBed} from '@angular/core/testing';

import {DocFormatServiceService} from './doc-format.service';

describe('DocFormatServiceService', () => {
  let service: DocFormatServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocFormatServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
