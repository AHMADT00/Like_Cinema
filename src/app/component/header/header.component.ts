import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  collapsed: boolean = true;
  dialogRef;
  constructor(public dialog: MatDialog) {}

  openDialog(n) {
    if (n == 'signup') {
      this.dialogRef = this.dialog.open(SignupComponent);
    } else {
      this.dialogRef = this.dialog.open(LoginComponent);
    }
    this.dialogRef.afterClosed().subscribe((result) => {});
  }
}
