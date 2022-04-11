import { TestBed } from '@angular/core/testing';

import { MakeAnOrderResolver } from './make-an-order.resolver';

describe('MakeAnOrderResolver', () => {
  let resolver: MakeAnOrderResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MakeAnOrderResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
