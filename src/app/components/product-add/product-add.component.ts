import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from '../../interfaces/product';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMPTY_STRING, NUMBER_REGEXP, PRICE_REGEXP, COMMA } from 'src/app/utility/constants';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  @Output() addClosed = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(ProductAddModalComponent, {
      width: '500px'
    }).afterClosed().subscribe(() => {
      this.addClosed.emit();
    });
  }
}

// MODAL WINDOW COMPONENT
@Component({
  selector: 'product-add-modal',
  templateUrl: './product-add-modal.html',
  styleUrls: ['./product-add-modal.css']
})
export class ProductAddModalComponent implements OnInit {

  addProductForm!: FormGroup;
  submitted: boolean = false;
  imageURL?: string;

  constructor(
    public dialogRef: MatDialogRef<ProductAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private productService: ProductService
    ) {}

  // iscupaj id user-a iz local storage
  userId: string = JSON.parse(this.loginService.getToken()).id;

  ngOnInit() {
    this.addProductForm = this.formBuilder.group({
      id: [EMPTY_STRING],
      name: [EMPTY_STRING, Validators.required],
      price: [EMPTY_STRING, [Validators.required, Validators.pattern(PRICE_REGEXP)]],
      quantity: [EMPTY_STRING, [Validators.required, Validators.pattern(NUMBER_REGEXP)]],
      description: [EMPTY_STRING, Validators.required],
      image: [EMPTY_STRING],
      user: [this.userId]
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.addProductForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;
  
    if(this.addProductForm.invalid) {
      return;
    }
  
    this.productService.addProduct(this.addProductForm.value).subscribe();

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
        this.addProductForm.patchValue({
          image: imageBase64
        })
      }
    }
  }
}

