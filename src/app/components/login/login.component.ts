import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { TOKEN_KEY, EMPTY_STRING } from 'src/app/utility/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted: boolean = false;
  // odredjuje u direktivi da li ce se pokazati poruka za Invalid Username or Password
  hasError: boolean = false;
  currentUser?: IUser;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [EMPTY_STRING, Validators.required],
      password: [EMPTY_STRING, [Validators.required, Validators.minLength(5)]]
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
        localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
        this.currentUser = data;
        this.router.navigate(['/user']);
      },
      (error) => {
        this.hasError = true;
      });;
  }
}
