import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products?: IProduct[];
  // za template - ako ima proizvoda prikazi ih a ako nema ne
  haveProducts: boolean = false;
  showChecked: boolean = false;

  constructor(
    private productService: ProductService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loadAllProducts();
  }

  // ako je Show My Products cekiran, nakon dodavanja proizvoda prikazi samo proizvode usera
  // ako nije cekiran a novi proizvod je dodat, nakon dodavanja ucitaj sve postojece proizvode sa dodatim 
  loadAddedProduct() {
    if(this.showChecked){
      this.loadUserProducts();
    }
    else {
      this.loadAllProducts();
    }
  }

  loadAllProducts() {
    this.productService.getProducts()
      .subscribe(
        (data) => {
          this.products = data;
          this.haveProducts = true;
        },
        (error) => {
          console.log(error.error);
          this.haveProducts = false;
        } 
      );
  }

  loadUserProducts() {
    this.productService.getProductsByUserId()
      .subscribe(
        (data) => {
          this.products = data;
          this.haveProducts = true;
        },
        (error) => {
          console.log(error.error);
          this.haveProducts = false;
        } 
      );
  }

  // proveri da li je user ulogovan
  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn;
  }

  // ako check box kliknut prikazi samo product-e od ulogovanog usera
  // u suprotnom prikazi sve product-e
  checkClicked(): void {
    if(this.showChecked) {
      this.showChecked = false;
      this.loadAllProducts();
    }
    else {
      this.showChecked = true;
      this.loadUserProducts();
    }
  }
}
