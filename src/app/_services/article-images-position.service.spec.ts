import {TestBed} from '@angular/core/testing';

import {ArticleImagesPositionService} from './article-images-position.service';

describe('ArticleImagesPositionService', () => {
  let service: ArticleImagesPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleImagesPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
