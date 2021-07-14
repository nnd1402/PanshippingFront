import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Validation } from './password-validator';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    }
    );
  }  

  get form(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if(this.registerForm.invalid) {
      return;
    }

    this.registrationService.registerUser(this.registerForm.value).subscribe((data: any) => {
      console.log(data);
    });

    alert('You have signed up successfully!')
  }
}
