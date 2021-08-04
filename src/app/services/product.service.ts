import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { IN_PROGRESS, IN_TRANSIT, DELIVERED } from '../utility/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  userId?: string;

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'text' as 'json'
  }

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
    ) { }

  addProduct(product: IProduct): Observable<any> {
    return this.httpClient.post<any>('/api/product/addProduct', JSON.stringify(product), this.httpHeader);
  }

  getProducts(): Observable<any> {
    return this.httpClient.get<any>('/api/product');
  }

  getProductsByUserId(): Observable<any> {
    this.userId = JSON.parse(this.loginService.getToken()).id;
    return this.httpClient.get<any>(`/api/product/getProductsByUser/${this.userId}`);
  }

  getAvailableToBuy(): Observable<any> {
    this.userId = JSON.parse(this.loginService.getToken()).id;
    return this.httpClient.get<any>(`/api/product/getAvailableToBuy/${this.userId}`);
  }

  editProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.put<IProduct>(`/api/product/${product.id}`, JSON.stringify(product), this.httpHeader);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.httpClient.delete<any>(`/api/product/${productId}`, this.httpHeader);
  }

  getBoughtProducts(userId: string) {
    return this.httpClient.get<any>(`/api/product/getBoughtProductsByUser/${userId}`)
    .pipe(
      map(products => {
        // podesavanje poruka za status posiljke koja je narucena
        for(let p of products) {
          for(let s of p.shipping) {
            const startDate = new Date(s.start);
            const endDate = new Date(s.end);
            const currentDate = new Date();
            p.isInProgress = false;
            p.isInTransit = false;
            p.isDelivered = false;
            if(startDate > currentDate) {
              p.status = IN_PROGRESS;
              p.isInProgress = true;
            }
            else if(endDate > currentDate) {
              p.status = IN_TRANSIT;
              p.isInTransit = true;
            }
            else {
              p.status = DELIVERED;
              p.isDelivered = true;
            }
          }
        }
        return products;
      })
    );
  }
}
