import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userId?: string;

  httpHeader = {
   headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private loginService: LoginService,
    private httpClient: HttpClient
  ) {
    // od user-a iz local storage dobavi id
    this.userId = JSON.parse(this.loginService.getToken()).id;
  }

  getUser(): Observable<any> {
    return this.httpClient.get<any>(`/api/user/${this.userId}`);
  }

  editUser(user: IUser): Observable<any> {
    return this.httpClient.put<any>(`/api/user/${this.userId}`, JSON.stringify(user), this.httpHeader);
  }
}
