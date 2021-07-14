import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { tokenKey } from 'src/app/utility/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted: boolean = false;
  hasError: boolean = false;
  currentUser?: IUser;
  token_key: string = tokenKey;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }
  // vraca kontrolu od login forme
  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if(this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.value).subscribe(
      (data: any) => {
        localStorage.setItem(this.token_key, JSON.stringify(data));
        this.currentUser = data;
        this.router.navigate(['']);
      },
      (error) => {
        this.hasError = true;
      });;
  }

  cardClicked() {
    this.hasError = false;
  }
}
