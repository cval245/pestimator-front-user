import {TestBed} from '@angular/core/testing';

import {IsLoggedInResolver} from './is-logged-in.resolver';

describe('IsLoggedInResolver', () => {
  let resolver: IsLoggedInResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(IsLoggedInResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
