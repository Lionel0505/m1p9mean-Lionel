import { TestBed } from '@angular/core/testing';

import { BenefitsResolver } from './benefits.resolver';

describe('BenefitsResolver', () => {
  let resolver: BenefitsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BenefitsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
