import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAnOrderComponent } from './make-an-order.component';

describe('MakeAnOrderComponent', () => {
  let component: MakeAnOrderComponent;
  let fixture: ComponentFixture<MakeAnOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeAnOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAnOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
