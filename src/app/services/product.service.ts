import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

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
    return this.httpClient.get<any>(`/api/product/getProductsByUserId/${this.userId}`);
  }

  editProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.put<IProduct>(`/api/product/${product.id}`, JSON.stringify(product), this.httpHeader);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.httpClient.delete<any>(`/api/product/${productId}`, this.httpHeader);
  }
}
