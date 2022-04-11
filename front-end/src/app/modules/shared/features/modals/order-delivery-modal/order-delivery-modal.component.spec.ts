import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeliveryModalComponent } from './order-delivery-modal.component';

describe('OrderDeliveryModalComponent', () => {
  let component: OrderDeliveryModalComponent;
  let fixture: ComponentFixture<OrderDeliveryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDeliveryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDeliveryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
