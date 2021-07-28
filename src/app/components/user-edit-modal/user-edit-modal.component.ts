import { Component, OnInit, Inject, Input } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from '../../interfaces/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { NUMBER_REGEXP } from 'src/app/utility/constants';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

  editUserForm!: FormGroup;
  submitted: boolean = false;
  user!: IUser;
  // url slike za src atribut img elementa u template-u
  imageURL?: string;

  constructor(
    public dialogRef: MatDialogRef<UserEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.user = data;
    console.log(this.user)
  }

  ngOnInit() {
    this.editUserForm = this.formBuilder.group({
      id: [this.user.id],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email, Validators.minLength(6)]],
      address: [this.user.address, Validators.required],
      country: [this.user.country, Validators.required],
      phone: [this.user.phone, [Validators.required, Validators.pattern(NUMBER_REGEXP)]],
      username: [this.user.userName],
      password: [this.user.password]
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.editUserForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;
  
    if(this.editUserForm.invalid) {
      return;
    }
    console.log(this.editUserForm.value)
    this.userService.editUser(this.editUserForm.value)
      .subscribe((data) => {
        console.log(data);
      });

    this.closeDialog();
  }

  // zatvori modal
  closeDialog(): void {
    this.dialogRef.close();
  }
}
