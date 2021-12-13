import {TestBed} from '@angular/core/testing';

import {FileEstTempService} from './file-est-temp.service';

describe('FileEstTempService', () => {
  let service: FileEstTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileEstTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
