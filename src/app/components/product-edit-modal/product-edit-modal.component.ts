import { Component, OnInit, Inject, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY_STRING, NUMBER_REGEXP, PRICE_REGEXP, COMMA, MEDIA_TYPE_URI } from 'src/app/utility/constants';
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
  // url slike za src atribut img elementa u template-u
  imageURL?: string;

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
    // ako produkt ima sliku spoji data:image/jpeg;base64
    // na base64string slike, u suprotnom podesi na prazan string
    data.image ? this.imageURL = MEDIA_TYPE_URI + data.image : EMPTY_STRING;
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
      ordered: [this.product.ordered],
      image: [this.product.image],
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

    this.closeDialog();
  }

  // zatvori modal
  closeDialog(): void {
    this.dialogRef.close();
  }

  // prikazi sliku u formi i podesi input polje za sliku na base64 string
  showPreview(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const[file] = event.target.files;
      reader.readAsDataURL(file);

      // podesi vrednost image input-a u formi na base64 string
      reader.onload = () => {
        this.imageURL = reader.result as string;
        // iseci data:image/jpeg;base64, deo iz stringa
        const imageBase64 = this.imageURL.split(COMMA)[1] + EMPTY_STRING;
        // postavi vrednost image inputa u formi na imageBase64
        this.editProductForm.patchValue({
          image: imageBase64
        })
      }
    }
  }
}
