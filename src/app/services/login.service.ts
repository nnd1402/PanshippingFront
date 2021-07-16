import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUserLogin } from '../interfaces/user-login';
import { TOKEN_KEY, EMPTY_STRING } from '../utility/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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
    return localStorage.getItem(TOKEN_KEY);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem(TOKEN_KEY);
    return (authToken !== null) ? true : false;
  }

  logout(): void {
    let removeToken = localStorage.removeItem(TOKEN_KEY);
    if(removeToken === null) {
      this.router.navigate([EMPTY_STRING]);
    }
    this.router.navigate(['/login']);
  }
}
