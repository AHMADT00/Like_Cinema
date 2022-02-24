import { ClientsService } from './../../../services/clients.service';
import { Client } from './../../../interfaces/client';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  client!: Client;
  userName = '';
  email = '';
  password = '';
  passwordconfirm = '';
  phoneNumber!: number;
  teleNumber!: number;
  iptvSub = false;
  isadmin = false;
  hide = true;
  hide2 = true;
  checked;
  constructor(
    private clientservices: ClientsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  check() {
    if (
      this.passwordconfirm == this.password &&
      this.userName != '' &&
      this.password != '' &&
      this.phoneNumber != undefined &&
      this.passwordconfirm != '' &&
      this.teleNumber != undefined
    ) {
      this.dialog.closeAll();
      this.checked = 'success';
    } else {
      this.checked = 'error';
    }
  }
  addClient() {
    console.log(this.checked == 'success');
    if (this.checked == 'success') {
      this.client = {
        userName: this.userName,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        teleNumber: this.teleNumber,
        iptvSub: this.iptvSub,
        isadmin: this.isadmin,
      };
      this.clientservices.AddClient(this.client);
      this.openSnackBar(this.checked);
    }
    this.openSnackBar(this.checked);
  }
  openSnackBar(x) {
    if (x == 'success') {
      this._snackBar.openFromComponent(AddClientSuccessComponent, {
        duration: 7000,
        panelClass: ['snackbar'],
      });
    } else {
      this._snackBar.openFromComponent(AddClientErrorComponent, {
        duration: 7000,
        panelClass: ['snackbar'],
      });
    }
  }
}
@Component({
  selector: 'add-client-success-snack',
  templateUrl: 'add-client-success-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
    `,
  ],
})
export class AddClientSuccessComponent {}
@Component({
  selector: 'add-client-error-snack',
  templateUrl: 'add-client-error-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
    `,
  ],
})
export class AddClientErrorComponent {}
