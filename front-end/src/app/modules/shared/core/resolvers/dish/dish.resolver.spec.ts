import { TestBed } from '@angular/core/testing';

import { DishResolver } from './dish.resolver';

describe('DishResolver', () => {
  let resolver: DishResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DishResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
