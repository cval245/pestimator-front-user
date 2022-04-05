import {TestBed} from '@angular/core/testing';

import {ArticleImagesService} from './article-images.service';

describe('ArticleImagesService', () => {
  let service: ArticleImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
