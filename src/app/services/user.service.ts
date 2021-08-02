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
    }),
    responseType: 'text' as 'json'
  }

  constructor(
    private loginService: LoginService,
    private httpClient: HttpClient
  ) {}

  getUser(): Observable<any> {    
    // od user-a iz local storage dobavi id
    this.userId = JSON.parse(this.loginService.getToken()).id;
    return this.httpClient.get<any>(`/api/user/${this.userId}`);
  }

  editUser(user: IUser): Observable<any> {
    return this.httpClient.put<any>(`/api/user/${user.id}`, JSON.stringify(user), this.httpHeader);
  }
}
