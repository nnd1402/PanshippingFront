import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUserLogin } from '../interfaces/user-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  currentUser = {};
  errorThrown: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  login(userLogin: IUserLogin) {
    return this.httpClient.post<any>('/api/user/login', JSON.stringify(userLogin), this.httpHeader);
  }

  getToken(): any {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout(): void {
    let removeToken = localStorage.removeItem('access_token');
    if(removeToken === null) {
      this.router.navigate(['']);
    }
  }
}
