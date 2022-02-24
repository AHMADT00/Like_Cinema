import { CookieService } from 'ngx-cookie-service';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;
  dialogRef;
  loggedin = ' ';
  fixed;
  constructor(public dialog: MatDialog, private cookieservice: CookieService) {}
  ngOnInit(): void {
    this.loggedin = environment.client.isadmin;
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const numb = window.scrollY;
    if (numb >= 300) {
      this.fixed = 'fixed-top header-fixed';
    } else {
      this.fixed = '';
    }
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
