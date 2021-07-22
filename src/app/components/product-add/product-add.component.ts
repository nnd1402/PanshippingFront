import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from '../../interfaces/product';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMPTY_STRING, NUMBER_REGEXP, PRICE_REGEXP } from 'src/app/utility/constants';
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
    const dialogRef = this.dialog.open(ProductAddModalComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

    this.dialog.afterAllClosed.subscribe(() => {
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

    this.onNoClick();
  }

  // zatvori modal
  onNoClick(): void {
    this.dialogRef.close();
  }
}

