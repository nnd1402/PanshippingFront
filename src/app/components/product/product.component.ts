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

  constructor(
    private productService: ProductService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
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

  // proveri da li je user ulogovan
  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn;
  }

  editProduct(product: IProduct) {
    this.productService.editProduct(product).subscribe();
    this.loadProducts();
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe();
    this.loadProducts();
  }
}
