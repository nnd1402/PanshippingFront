import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IShippingRequest } from '../interfaces/shipping-request';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(
    private httpClient: HttpClient
  ) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'text' as 'json'
  }

  sendOrder(order: IShippingRequest): Observable<any> {
    return this.httpClient.post<any>('/api/shipping/addShipment', JSON.stringify(order), this.httpHeader);
  }
}
