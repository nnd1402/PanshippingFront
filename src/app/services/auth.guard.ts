import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,  Router } from '@angular/router';
import { LoginService } from './login.service';
import { LOGIN_URL, REGISTRATION_URL, USER_URL, EMPTY_STRING } from '../utility/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public loginService: LoginService,
    public router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // ako je korisnik ulogovan
    if(this.loginService.isLoggedIn) {
      // i pokusa da pristupi login-u ili registraciji
      // redirektuj ga na AppComponent
      if(state.url === LOGIN_URL || state.url === REGISTRATION_URL) {
        this.router.navigate([EMPTY_STRING]);
        return false;
      }
      return true;
    }
    // ako nije ulogovan i pokusa da pristupi user-u redirektuj ga na login stranicu
    else if(state.url === USER_URL) {
      this.router.navigate([LOGIN_URL]);
      return false;
    }
    return true;
  }  
}
