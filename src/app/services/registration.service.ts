import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  endpoint: string = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  registerUser(user: IUser): Observable<any> {
    return this.httpClient.post<IUser>(this.endpoint + '/users', JSON.stringify(user), this.httpHeader);
  }
}