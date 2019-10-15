import { TestBed } from '@angular/core/testing';

import { DistributionsService } from './distributions.service';

describe('DistributionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistributionsService = TestBed.get(DistributionsService);
    expect(service).toBeTruthy();
  });
});
