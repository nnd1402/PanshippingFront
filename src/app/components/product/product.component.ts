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
  showMyProducts: boolean = false;
  showMyShippment: boolean = false;
  userId!: string;

  constructor(
    private productService: ProductService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loadAllProducts();
    // izvuci id ulogovanog usera iz local storage-a
    this.userId = JSON.parse(this.loginService.getToken()).id;
  }

  // ako je Show My Products cekiran, nakon dodavanja proizvoda prikazi samo proizvode usera
  // ako nije cekiran a novi proizvod je dodat, nakon dodavanja ucitaj sve postojece proizvode sa dodatim 
  loadAddedProduct() {
    if(this.showMyProducts){
      this.loadUserProducts();
    }
    else {
      this.loadAllProducts();
    }
  }

  // izvrsi get zahtev iz product servisa za dobavljanje liste
  // proizvoda koje je ulogovani korisnik porucio
  loadMyShippment() {
    console.log(this.userId)
    this.productService.getBoughtProducts(this.userId).subscribe(
      (data) => {
        this.products = data;
      },
      (error => {
        console.log(error.error);
      })
    );
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
  myProductsClicked(): void {
    if(this.showMyProducts) {
      this.showMyProducts = false;
      this.loadAllProducts();
    }
    else {
      this.showMyProducts = true;
      this.loadUserProducts();
    }
  }

  myShippmentClicked() {
    if(this.showMyShippment) {
      this.showMyShippment = false;
      this.loadAllProducts();
    }
    else {
      this.showMyShippment = true;
      this.loadMyShippment();
    }
  }
}
