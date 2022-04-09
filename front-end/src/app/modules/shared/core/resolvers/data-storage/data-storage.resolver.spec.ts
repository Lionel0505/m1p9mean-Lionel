import { TestBed } from '@angular/core/testing';

import { DataStorageResolver } from './data-storage.resolver';

describe('DataStorageResolver', () => {
  let resolver: DataStorageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DataStorageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
