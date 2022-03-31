import {TestBed} from '@angular/core/testing';

import {ArticleFullService} from './article-full.service';

describe('ArticleFullService', () => {
  let service: ArticleFullService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleFullService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
