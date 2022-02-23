import { CookieService } from 'ngx-cookie-service';
import { Client } from './../../../interfaces/client';
import { ClientsService } from './../../../services/clients.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  rememberme = false;
  clients: Client[] = [];
  userName!: string;
  password!: string;
  hide = true;
  hide2 = true;
  dialogRef;
  loggedin = false;
  constructor(
    private service: ClientsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cookieservice: CookieService
  ) {}
  
  ngOnInit(): void {
    this.service.GetClient().subscribe(
      (res) => {
        this.clients = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert('Error while fetching data');
      }
    );
  }

  loginClient() {
    this.clients.forEach((client) => {
      if (
        (client.userName == this.userName &&
          client.password == this.password) ||
        (client.email == this.userName && client.password == this.password)
      ) {
        this.cookieservice.set('isadmin', `${client.isadmin}`);
        this.cookieservice.set('userName', `${client.userName}`);
        this.cookieservice.set('userId', `${client.id}`);
        this.cookieservice.set('rememberme', `${this.rememberme}`);
        this.loggedin = true;
        this.openSnackBar(this.loggedin);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      if (this.loggedin == false) {
        this.openSnackBar(this.loggedin);
      }
    });
    this.loggedin = false;
  }

  openDialog() {
    this.dialogRef = this.dialog.open(SignupComponent);
    this.dialogRef.afterClosed().subscribe((result) => {});
  }
  openSnackBar(x) {
    if (x == true) {
      this._snackBar.openFromComponent(LogInClientSuccessComponent, {
        duration: 7000,
        panelClass: ['snackbar'],
      });
    } else {
      this._snackBar.openFromComponent(LogInClientErrorComponent, {
        duration: 7000,
        panelClass: ['snackbar'],
      });
    }
  }
}

@Component({
  selector: 'logIn-client-success-snack',
  templateUrl: 'logIn-client-success-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
    `,
  ],
})
export class LogInClientSuccessComponent {}
@Component({
  selector: 'logIn-client-error-snack',
  templateUrl: 'logIn-client-error-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
    `,
  ],
})
export class LogInClientErrorComponent {}
