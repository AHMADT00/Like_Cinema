import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;
  dialogRef;
  loggedin = ' ';
  constructor(public dialog: MatDialog, private cookieservice: CookieService) {}
  ngOnInit(): void {
    this.loggedin = this.cookieservice.get('isadmin');
  }
  logout() {
    this.cookieservice.deleteAll();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  openDialog(n) {
    if (n == 'signup') {
      this.dialogRef = this.dialog.open(SignupComponent);
    } else {
      this.dialogRef = this.dialog.open(LoginComponent);
    }
    this.dialogRef.afterClosed().subscribe((result) => {});
  }
}
