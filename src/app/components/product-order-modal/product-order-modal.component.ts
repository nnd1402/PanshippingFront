import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from 'src/app/interfaces/product';
import { IUser } from '../../interfaces/user';
import { ShippingService } from 'src/app/services/shipping.service';
import { UserService } from 'src/app/services/user.service';
import { IShippingRequest } from 'src/app/interfaces/shipping-request';

@Component({
  selector: 'app-product-order-modal',
  templateUrl: './product-order-modal.component.html',
  styleUrls: ['./product-order-modal.component.css']
})
export class ProductOrderModalComponent implements OnInit {

  user: IUser = <IUser>{};
  product!: IProduct;
  date = new Date();
  order: IShippingRequest = <IShippingRequest>{};

  constructor(
    public dialogRef: MatDialogRef<ProductOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private userService: UserService,
    private shippingService: ShippingService
  ) {
    this.product = data;
  }

  ngOnInit() {
    this.userService.getUser().subscribe((data) => {
      this.user = data;
    });
  }
  
  onConfirmOrder() {
    this.order.productId = this.product.id;
    this.order.userId = this.user.id;
    this.shippingService.sendOrder(this.order).subscribe();
    
    this.closeDialog();
  }

  // zatvori modal
  closeDialog(): void {
    this.dialogRef.close();
  }
}
