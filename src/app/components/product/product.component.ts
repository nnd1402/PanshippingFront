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

  products?: any;
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
    // posle instanciranja komponente ako je korisnik ulogovan ucitaj
    // sve proizvode koji mogu da se kupe a ne pripadaju ulogovanom korisniku
    if(this.loginService.isLoggedIn) {
      this.loadAvailableToBuyProducts();
    }
    // u suprotnom posto korisnik nije ulogovan ucitaj sve proizvode koji postoje
    else {
      this.loadAllProducts();
    }
    // izvuci id ulogovanog usera iz local storage-a
    this.userId = JSON.parse(this.loginService.getToken()).id;
  }

  // dobavi sve proizvode koji ne pripadaju ulogovanom korisniku a mogu da se kupe
  loadAvailableToBuyProducts() {
    this.productService.getAvailableToBuy().subscribe(
      (data => {
        this.products = data;        
        this.haveProducts = true;
      }),
      (error => {
        this.haveProducts = false;
      })
    )
  }
 
  // nakon sto se modal za Add Product zatvori poziva se ova metoda preko event emitter-a
  // bez obzira da li je kliknuto add ili cancel
  loadAddedProduct() {
    // ako je Show My Products cekiran a korisnik doda novi proizvoda prikazi samo proizvode usera
    if(this.showMyProducts) {
      this.loadUserProducts();
    }
    // ako je Show My Shippment cekiran a korisnik doda novi proizvod ucitaj My Shippment proizvode
    else if(this.showMyShippment) {
      this.loadMyShippment();
    }
    // ako nije cekiran Show My Products ni Show My Shippment a novi proizvod je dodat, 
    // nakon dodavanja ucitaj sve postojece proizvode koji ne pripadaju ulogovanom korisniku i koji mogu da se kupe
    else {
      this.loadAvailableToBuyProducts();
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
    // posto je odcekiran ucitaj sve proizvode koji ne pripadaju ulogovanom korisniku
    // a mogu da se kupe
    if(this.showMyProducts) {
      this.showMyProducts = false;
      this.loadAvailableToBuyProducts();
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
    // posto je odcekiran ucitaj sve proizvode koji ne pripadaju ulogovanom korisniku
    // a mogu da se kupe
    if(this.showMyShippment) {
      this.showMyShippment = false;
      this.loadAvailableToBuyProducts();
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
