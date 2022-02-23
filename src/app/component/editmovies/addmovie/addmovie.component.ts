import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { Movie } from './../../../interfaces/movie';
import { MoviesService } from './../../../services/movies.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css'],
})
export class AddmovieComponent {
  movie!: Movie;
  src = '';
  name = '';
  rating = '0';
  category: string[] = [];
  start = '';
  end = '';
  date = '';
  categoryColor: string[] = [];
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  toppings = new FormControl();
  toppingList: string[] = [
    'Action',
    'Fantasy',
    'Adventure',
    'Science',
    'Fiction',
    'Animation',
    'Comedy',
  ];
  added;
  selectedFile;
  constructor(
    private service: MoviesService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private firestorage: AngularFireStorage
  ) {}

  formatLabel(value: number) {
    return value;
  }
  chooseFile(file) {
    this.ref = this.firestorage.ref(`Movie Images/${file.name}`);
    this.task = this.ref.put(file);
    setTimeout(() => {
      this.ref.getDownloadURL().subscribe((res) => {
        this.src = res;
      });
    }, 3000);
  }

  AddMovie() {
    if (
      this.name != '' &&
      this.toppings.value != null &&
      this.start != '' &&
      this.end != '' &&
      this.date != '' &&
      this.rating != '0'
    ) {
      if (this.toppings.value.length != 0) {
        this.category = this.toppings.value;
        this.category.forEach((category) => {
          switch (category) {
            case 'Action':
              this.categoryColor.push('blue');
              break;
            case 'Fantasy':
              this.categoryColor.push('pink');
              break;
            case 'Science':
              this.categoryColor.push('green');
              break;
            case 'Fiction':
              this.categoryColor.push('purple');
              break;
            case 'Animation':
              this.categoryColor.push('red');
              break;
            case 'Comedy':
              this.categoryColor.push('yell');
              break;
            case 'Adventure':
              this.categoryColor.push('orange');
              break;
          }
        });
        this.src;
        this.movie = {
          name: this.name,
          src: this.src,
          rating: this.rating,
          category: this.category,
          categoryColor: this.categoryColor,
          start: this.start,
          end: this.end,
          date: this.date,
        };
        this.endto12(this.movie);
        this.startto12(this.movie);
        this.movie.date = this.movie.date.replace(/-/g, '/');
        this.service.AddMovie(this.movie);
        this.categoryColor = [];
        this.openSnackBar('addsuccess');
        this.dialog.closeAll();
      } else {
        this.openSnackBar('inputempty');
      }
    } else {
      this.openSnackBar('inputempty');
    }
  }
  endto12(n) {
    var H = +n.end.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? ' AM' : ' PM';
    n.end = h + n.end.substr(2, 3) + ampm;
  }
  startto12(n) {
    var H = +n.start.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? ' AM' : ' PM';
    n.start = h + n.start.substr(2, 3) + ampm;
  }
  openSnackBar(n) {
    if (n == 'addsuccess') {
      this._snackBar.openFromComponent(AddSuccessComponent, {
        duration: 4000,
        panelClass: ['snackbar'],
      });
    } else if (n == 'inputempty') {
      this._snackBar.openFromComponent(AddErrorComponent, {
        duration: 4000,
        panelClass: ['snackbar'],
      });
    }
  }
}
@Component({
  selector: 'add-success-snack',
  templateUrl: 'add-success-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
      button {
        border: none;
        background: none;
        color: red;
        font-weight: 900;
        font-size: 14px;
      }
    `,
  ],
})
export class AddSuccessComponent {}
@Component({
  selector: 'add-error-snack',
  templateUrl: 'add-error-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
      button {
        border: none;
        background: none;
        color: red;
        font-weight: 900;
        font-size: 14px;
      }
    `,
  ],
})
export class AddErrorComponent {}
