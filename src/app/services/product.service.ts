import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  addProduct(product: IProduct) {
    return this.httpClient.post<IProduct>('/api/product/addProduct', JSON.stringify(product), this.httpHeader);
  }
}
