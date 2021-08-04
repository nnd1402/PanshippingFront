import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrderModalComponent } from './product-order-modal.component';

describe('ProductOrderModalComponent', () => {
  let component: ProductOrderModalComponent;
  let fixture: ComponentFixture<ProductOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOrderModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
