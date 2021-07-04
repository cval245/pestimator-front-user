import { TestBed } from '@angular/core/testing';

import { EntitySizeService } from './entity-size.service';

describe('EntitySizeService', () => {
  let service: EntitySizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntitySizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
