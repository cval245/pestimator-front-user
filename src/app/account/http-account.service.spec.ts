import { TestBed } from '@angular/core/testing';

import { HttpAccountService } from './http-account.service';

describe('HttpAccountService', () => {
  let service: HttpAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
