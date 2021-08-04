import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';
import { ProductDeleteModalComponent } from '../product-delete-modal/product-delete-modal.component';
import { ProductOrderModalComponent } from '../product-order-modal/product-order-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() productList?: any;
  @Input() isLoggedIn?: boolean;
  @Input() showMyProducts: boolean = false;
  @Input() showMyOrders: boolean = false;
  @Output() editClosed = new EventEmitter();
  @Output() deleteClosed = new EventEmitter();
  @Output() orderClosed = new EventEmitter();


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}

  // metoda za otvaranje edit modala koja se poziva iz product-list template-a
  openEditDialog(product: IProduct): void {

    // drugi parametar open() metode je dialogConfig u koji se prosledjuju podaci potrebni za modalni prozor,
    // kao data prosledjujem product iz html template-a ciji ce se podaci prikazati u input poljima product-edit-modal.component modala
    this.dialog.open(ProductEditModalComponent, {
      width: '500px',
      data: product
    }).afterClosed().subscribe(() => {
      this.editClosed.emit();
    });
  }

  // metoda za otvaranje delete modala koja se poziva iz product-list template-a
  openDeleteDialog(productId: string): void {

    this.dialog.open(ProductDeleteModalComponent, {
      width: '500px',
      data: productId
    }).afterClosed().subscribe(() => {
      this.editClosed.emit();
    });
  }

  // nakon zatvaranja modala za narucivanje proizvoda ucitaj opet sve proizvode koji mogu da se kupe
  openOrderDialog(product: IProduct) {
    this.dialog.open(ProductOrderModalComponent, {
      width: '500px',
      data: product
    }).afterClosed().subscribe(() => {
      this.orderClosed.emit();
    });
  }
}
