import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUserLogin } from '../interfaces/user-login';
import { tokenKey } from '../utility/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token_key: string = tokenKey;

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
    return localStorage.getItem(this.token_key);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem(this.token_key);
    return (authToken !== null) ? true : false;
  }

  logout(): void {
    let removeToken = localStorage.removeItem(this.token_key);
    if(removeToken === null) {
      this.router.navigate(['']);
    }
    this.router.navigate(['/login']);
  }
}
