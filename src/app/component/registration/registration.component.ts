import { RegistrationService } from './../../services/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientsService } from 'src/app/services/clients.service';
import { Client } from './../../interfaces/client';
import { SelectedMovie } from './../../interfaces/selected-movie';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Registration } from 'src/app/interfaces/registration';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  clients: Client[] = [];
  datafromchild: SelectedMovie[] = [];
  registration!: Registration;
  userNameFormControl = new FormControl('', [Validators.required]);
  phoneNumberFormControl = new FormControl('', [Validators.required]);
  carPlateFormControl = new FormControl('', [Validators.required]);
  currentTab = 0;
  tab = true;
  next = false;
  userId!: string;
  prevBtn = 'none';
  nextBtn = 'Next';
  userName!: string;
  phoneNumber!: string;
  carPlate!: string;
  step;
  step1;
  routerLink;
  SnackBar = 'error';

  constructor(
    private clientservice: ClientsService,
    private _snackBar: MatSnackBar,
    private register: RegistrationService
  ) {}

  ngOnInit(): void {
    this.userId = environment.client.userId;
    console.log(this.userId);
    this.showTab(this.currentTab);
    this.clientservice.GetClient().subscribe((res) => {
      this.clients = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      });
    });
  }

  Valid() {
    this.clients.forEach((client) => {
      if (
        client.id == this.userId &&
        this.userNameFormControl.value == client.userName
      ) {
        this.SnackBar = 'success';
      }
    });
    if (this.currentTab == 1 && this.SnackBar == 'success') {
      this.routerLink = '';
    } else {
      this.routerLink = undefined;
    }
  }
  Submit() {
    if (this.SnackBar == 'success') {
      this.registration = {
        clientId: this.userId,
        clientUserName: this.userNameFormControl.value,
        clientPhoneNumber: this.phoneNumberFormControl.value,
        clientCarPlate: this.carPlateFormControl.value,
        selectedMovies: this.datafromchild,
      };
      this.register.AddRegistration(this.registration);
    }
    this.openSnackBar(this.SnackBar);
  }

  nextPrev(n) {
    if (this.validateForm() || n == -1) {
      if (this.currentTab < 1 || n == -1) {
        this.currentTab = this.currentTab + n;
      }

      if (n == 1 && this.nextBtn == 'next') {
        this.next = true;
      } else if (n == 1 && this.nextBtn == 'Submit') {
        this.Submit();
      }
      this.showTab(this.currentTab);
    }
    this.scrollToTop();
  }
  showTab(n) {
    var x = document.getElementsByClassName('tab');
    if (n == 0) {
      this.tab = true;
    } else {
      this.tab = false;
    }
    if (n == 0) {
      this.prevBtn = 'none';
    } else {
      this.prevBtn = 'inline';
    }
    if (n == x.length - 1) {
      this.nextBtn = 'Submit';
    } else if (n == 0) {
      this.nextBtn = 'Next';
    }
    this.fixStepIndicator();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  validateForm() {
    var x,
      y,
      i,
      valid = true;
    if (this.currentTab == 1) {
      x = document.getElementsByClassName('tab');
      y = x[this.currentTab].getElementsByTagName('input');

      for (i = 0; i < y.length; i++) {
        if (y[i].value == '') {
          y[i].className += ' invalid';

          valid = false;
        }
      }
    } else if (this.currentTab == 0) {
      if (this.datafromchild.length == 0) {
        valid = false;
        this.openSnackBar('selectmovie');
      }
    }
    return valid;
  }

  fixStepIndicator() {
    if (this.currentTab == 0) {
      this.step = 'step finish';
      this.step1 = 'step';
    } else {
      this.step = 'step';
      this.step1 = 'step finish';
    }
  }
  openSnackBar(x) {
    if (x == 'success') {
      this._snackBar.openFromComponent(RegistrationSuccessComponent, {
        duration: 7000,
        panelClass: ['snackbar'],
      });
    } else if (x == 'error') {
      this._snackBar.openFromComponent(RegistrationErrorComponent, {
        duration: 7000,
        panelClass: ['snackbar'],
      });
    } else if (x == 'selectmovie') {
      this._snackBar.openFromComponent(SelectMovieErrorComponent, {
        duration: 7000,
        panelClass: ['snackbar'],
      });
    }
  }
}
@Component({
  selector: 'registration-success-snack',
  templateUrl: 'registration-success-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
    `,
  ],
})
export class RegistrationSuccessComponent {}
@Component({
  selector: 'registration-error-snack',
  templateUrl: 'registration-error-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
    `,
  ],
})
export class RegistrationErrorComponent {}
@Component({
  selector: 'selectmovie-error-snack',
  templateUrl: 'selectmovie-error-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
    `,
  ],
})
export class SelectMovieErrorComponent {}
