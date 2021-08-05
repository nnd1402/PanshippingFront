import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  // trenutno ulogovani user
  user?: IUser;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // dobavi podatke o trenutno ulogovanom user-u preko user.service-s
    this.userService.getUser().subscribe((data) => {
      this.user = data;
    });
  }

  openEditDialog(): void {
    this.dialog.open(UserEditModalComponent, {
      width: '500px',
      data: this.user
    }).afterClosed().subscribe(() => {
      this.userService.getUser().subscribe((data) => {
        this.user = data;
      });
    });
  }
}
