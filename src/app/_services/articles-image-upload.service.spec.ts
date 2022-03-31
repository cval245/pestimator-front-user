import {TestBed} from '@angular/core/testing';

import {ArticlesImageUploadService} from './articles-image-upload.service';

describe('ArticlesImageUploadService', () => {
  let service: ArticlesImageUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesImageUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
