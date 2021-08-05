import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css']
})
export class ProductDeleteModalComponent implements OnInit {
  productId!: string;

  constructor(
    public dialogRef: MatDialogRef<ProductDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private productService: ProductService
  ) { 
    this.productId = data;
  }

  ngOnInit(): void {
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productId).subscribe();

    this.closeDialog();
  }

  // zatvori modal
  closeDialog(): void {
    this.dialogRef.close();
  }
}
