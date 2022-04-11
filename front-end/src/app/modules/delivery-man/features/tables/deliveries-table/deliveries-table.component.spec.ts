import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesTableComponent } from './deliveries-table.component';

describe('DeliveriesTableComponent', () => {
  let component: DeliveriesTableComponent;
  let fixture: ComponentFixture<DeliveriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveriesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
