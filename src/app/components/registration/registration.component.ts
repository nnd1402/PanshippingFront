import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validation } from './password-validator';
import { RegistrationService } from '../../services/registration.service';
import { Router } from '@angular/router'
import { EMPTY_STRING, NUMBER_REGEXP, USER_EXISTS } from 'src/app/utility/constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  usernameExists: string = ''; 

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: [EMPTY_STRING],
      firstName: [EMPTY_STRING, Validators.required],
      lastName: [EMPTY_STRING, Validators.required],
      username: [EMPTY_STRING, Validators.required],
      email: [EMPTY_STRING, [Validators.required, Validators.email, Validators.minLength(6)]],
      password: [EMPTY_STRING, [Validators.required, Validators.minLength(5)]],
      confirmPassword: [EMPTY_STRING, Validators.required],
      address: [EMPTY_STRING, Validators.required],
      country: [EMPTY_STRING, Validators.required],
      phone: [EMPTY_STRING, [Validators.required, Validators.pattern(NUMBER_REGEXP)]],
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    }
    );
  }  

  // vraca kontrolu od register forme
  get form(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if(this.registerForm.invalid) {
      return;
    }

    this.registrationService.registerUser(this.registerForm.value).subscribe(
      _ => 
      {      
        this.router.navigate(['/login']);
      },
      (error => {
        if(USER_EXISTS === error.error)
          this.usernameExists = USER_EXISTS;
      })
    );
  }
}
