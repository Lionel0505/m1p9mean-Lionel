import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDishesComponent } from './restaurant-dishes.component';

describe('RestaurantDishesComponent', () => {
  let component: RestaurantDishesComponent;
  let fixture: ComponentFixture<RestaurantDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantDishesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
