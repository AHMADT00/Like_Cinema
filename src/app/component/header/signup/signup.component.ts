import { ClientsService } from './../../../services/clients.service';
import { Client } from './../../../interfaces/client';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  client!: Client;
  userName!: string;
  email!: string;
  password!: string;
  passwordconfirm!: string;
  phoneNumber!: number;
  teleNumber!: number;
  iptvSub!: boolean;
  isadmin = false;
  hide = true;
  hide2 = true;
  constructor(
    private clientservices: ClientsService,
    private _snackBar: MatSnackBar
  ) {}
  addClient() {
    if (this.passwordconfirm === this.password) {
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
      this.openSnackBar();
    }
  }
  openSnackBar() {
    this._snackBar.openFromComponent(AddClientSuccessComponent, {
      duration: 7000,
      panelClass: ['snackbar'],
    });
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
