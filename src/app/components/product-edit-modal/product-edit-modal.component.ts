import { Component, OnInit, Inject, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NUMBER_REGEXP, PRICE_REGEXP} from 'src/app/utility/constants';
import { IProduct } from '../../interfaces/product';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

  editProductForm!: FormGroup;
  submitted: boolean = false;
  product!: IProduct;

  constructor(
    public dialogRef: MatDialogRef<ProductEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private productService: ProductService
  ) { 
    // product prosledjen u openEditDialog(product) iz product-list.component
    // postavi kao vrednost product propertija u ovoj komponenti, koji ce sluziti
    // za popunjavanje input polja u formi
    this.product = data;
  }

  // iscupaj id user-a iz local storage
  userId: string = JSON.parse(this.loginService.getToken()).id;

  ngOnInit() {
    this.editProductForm = this.formBuilder.group({
      id: [this.product.id],
      name: [this.product.name, Validators.required],
      price: [this.product.price, [Validators.required, Validators.pattern(PRICE_REGEXP)]],
      quantity: [this.product.quantity, [Validators.required, Validators.pattern(NUMBER_REGEXP)]],
      description: [this.product.description, Validators.required],
      user: [this.userId]
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.editProductForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;
  
    if(this.editProductForm.invalid) {
      return;
    }
  
    this.productService.editProduct(this.editProductForm.value).subscribe();

    this.onNoClick();
  }

  // zatvori modal
  onNoClick(): void {
    this.dialogRef.close();
  }

}
