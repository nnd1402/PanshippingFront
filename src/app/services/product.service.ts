import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'text' as 'json'
  }

  constructor(private httpClient: HttpClient) { }

  addProduct(product: IProduct): Observable<any> {
    return this.httpClient.post<any>('/api/product/addProduct', JSON.stringify(product), this.httpHeader);
  }

  getProducts(): Observable<any> {
    return this.httpClient.get<any>('/api/product');
  }

  editProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.put<IProduct>(`/api/product/${product.id}`, JSON.stringify(product), this.httpHeader);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.httpClient.delete<any>(`/api/product/${productId}`, this.httpHeader);
  }
}
