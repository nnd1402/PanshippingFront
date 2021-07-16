import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  signOutClicked(): void {
    this.loginService.logout();
  }
  
}
