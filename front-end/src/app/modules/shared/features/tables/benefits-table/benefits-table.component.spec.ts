import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsTableComponent } from './benefits-table.component';

describe('BenefitsTableComponent', () => {
  let component: BenefitsTableComponent;
  let fixture: ComponentFixture<BenefitsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
