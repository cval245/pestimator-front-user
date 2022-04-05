import {TestBed} from '@angular/core/testing';

import {ImageArticlesService} from './image-articles.service';

describe('ImageArticlesService', () => {
  let service: ImageArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
