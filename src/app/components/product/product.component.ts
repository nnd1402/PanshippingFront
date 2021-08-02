import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { LoginService } from 'src/app/services/login.service';
import { NO_BOUGHT_PRODUCTS, NO_USER_PRODUCTS, NO_PRODUCTS } from 'src/app/utility/constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products?: IProduct[];
  // za template - ako ima proizvoda prikazi ih a ako nema ne, odnosno prikazi poruku da list prazna
  haveProducts: boolean = false;
  // belezi stanje da li je Show My Products check box cekiran
  showMyProducts: boolean = false;
  // belezi stanje da li je Show My Shippment check box cekiran
  showMyShippment: boolean = false;
  // predstavlja Id ulogovanog korisnika
  userId!: string;

  constructor(
    private productService: ProductService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    // pri instaciranju komponente ucitaj sve proizvode koji postoje
    this.loadAllProducts();
    // izvuci id ulogovanog usera iz local storage-a
    this.userId = JSON.parse(this.loginService.getToken()).id;
  }

  // ako je Show My Products cekiran a korisnik doda novi proizvoda prikazi samo proizvode usera
  // ako nije cekiran a novi proizvod je dodat, nakon dodavanja ucitaj sve postojece proizvode sa dodatim 
  loadAddedProduct() {
    if(this.showMyProducts){
      this.loadUserProducts();
    }
    else {
      this.loadAllProducts();
    }
  }

  // izvrsi get zahtev u product servisu za dobavljanje liste proizvoda koje je ulogovani korisnik porucio
  loadMyShippment() {
    this.productService.getBoughtProducts(this.userId).subscribe(
      (data) => {
        this.products = data;
        this.haveProducts = true;
      },
      (error => {
        // ako je poruka 'There are no products bought by this user'
        // promeni vrednost haveProducts u false sto ce prikazati empty list poruku na stranici
        if(NO_BOUGHT_PRODUCTS === error.error)
          this.haveProducts = false;
        console.log(error.error);
      })
    );
  }

  // metoda za ucitavanje svih proizvoda
  loadAllProducts() {
    this.productService.getProducts()
      .subscribe(
        (data) => {
          this.products = data;
          this.haveProducts = true;
        },
        (error) => {
          // ako je poruka 'There are no products in the database'
          // promeni vrednost haveProducts u false sto ce prikazati empty list poruku na stranici
          if(NO_PRODUCTS === error.error)
            this.haveProducts = false;
          console.log(error.error);
        } 
      );
  }

  // ucitaj proizvode ulogovanog korisnika
  loadUserProducts() {
    this.productService.getProductsByUserId()
      .subscribe(
        (data) => {
          this.products = data;
          this.haveProducts = true;
        },
        (error) => {
          // ako je poruka 'There are no products made by this user'
          // promeni vrednost haveProducts u false sto ce prikazati empty list poruku na stranici
          if(NO_USER_PRODUCTS === error.error)
            this.haveProducts = false;
          console.log(error.error);
        } 
      );
  }

  // proveri da li je user ulogovan
  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn;
  }

  // ako je Show My Products check box kliknut
  myProductsClicked(myShippmentCheckBox: any): void {
    // odcekiraj Show My Shippment bez obzira da li je cekiran ili nije
    myShippmentCheckBox.checked = false;    
    // vrednost showMyShippment propertija podesi na false jer postoji mogucnost da je
    // korisnik pre klika na Show My Products predhodno cekirao Show My Shippment check box
    // a da ga nije odcekirao
    this.showMyShippment = false;
    // ako je showMyProducts true znaci da je Show My Products cekiran
    // i da je korisnik kliknuo check box da ga odcekira
    // posto je odcekiran ucitaj sve proizvode koji postoje
    if(this.showMyProducts) {
      this.showMyProducts = false;
      this.loadAllProducts();
    }
    // ako je showMyProducts false znaci da Show My Products check box nije cekiran, 
    // a korisnik je kliknuo da ga cekira 
    // podesi vrednost showMyProducts na true sto ce znaciti da je cekiran
    // zatim ucitaj proizvode ulogovanog korisnika
    else {
      this.showMyProducts = true;
      this.loadUserProducts();
    }
  }

  // ako je Show My Shippment check box kliknut
  myShippmentClicked(myProductsCheckBox: any) {
    // odcekiraj Show My Products bez obzira da li je cekiran ili nije
    myProductsCheckBox.checked = false;
    // vrednost showMyProducts propertija podesi na false jer postoji mogucnost da je
    // korisnik pre klika na Show My Shippment predhodno cekirao Show My Products check box
    // a da ga nije odcekirao
    this.showMyProducts = false;
    // ako je showMyShippment true znaci da je Show My Shippment cekiran
    // i da je korisnik kliknuo check box da ga odcekira
    // posto je odcekiran ucitaj sve proizvode koji postoje
    if(this.showMyShippment) {
      this.showMyShippment = false;
      this.loadAllProducts();
    }
    // ako je showMyProducts false znaci da Show My Shippment check box nije cekiran, 
    // a korisnik je kliknuo da ga cekira 
    // podesi vrednost showMyShippment na true sto ce znaciti da je cekiran
    // zatim ucitaj proizvode ulogovanog korisnika
    else {
      this.showMyShippment = true;
      this.loadMyShippment();
    }
  }
}
