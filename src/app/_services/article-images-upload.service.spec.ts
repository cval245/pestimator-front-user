import {TestBed} from '@angular/core/testing';

import {ArticleImagesUploadService} from './article-images-upload.service';

describe('ArticleImagesUploadService', () => {
  let service: ArticleImagesUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleImagesUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
