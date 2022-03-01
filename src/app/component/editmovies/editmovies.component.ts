import { MatDialog } from '@angular/material/dialog';
import { Movie } from './../../interfaces/movie';
import { MoviesService } from '../../services/movies.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AngularFireStorageReference,
  AngularFireUploadTask,
  AngularFireStorage,
} from '@angular/fire/compat/storage';

let undoMovies: Movie[] = [];
let undoEditMovies: {};
let undoMoviesId;
let undo = false;
@Component({
  selector: 'app-editmovies',
  templateUrl: './editmovies.component.html',
  styleUrls: ['./editmovies.component.css'],
})
export class EditmoviesComponent implements OnInit {
  delete: string[] = [];
  dialogRef;
  movies: Movie[] = [];
  displayedColumns: string[] = [
    'src',
    'name',
    'rating',
    'category',
    'start',
    'end',
    'date',
    'edit',
  ];
  row;
  toppingList: string[] = [
    'Adventure',
    'Science',
    'Animation',
    'Comedy',
    'Fantasy',
    'Fiction',
    'Action',
  ];
  deleteAll = false;
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  dataSource!: MatTableDataSource<Movie>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: MoviesService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private firestorage: AngularFireStorage
  ) {}
  ngOnInit() {
    this.service.GetMovies().subscribe(
      (res) => {
        this.movies = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          data.checked = false;
          data.edit = false;
          return data;
        });
        this.dataSource = new MatTableDataSource(this.movies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        alert('Error while fetching data');
      }
    );
  }
  formatLabel(value: number) {
    return value;
  }
  Edit(row, id) {
    row.categoryColor = [];
    row.category.forEach((category) => {
      switch (category) {
        case 'Action':
          row.categoryColor.push('blue');
          break;
        case 'Fantasy':
          row.categoryColor.push('pink');
          break;
        case 'Science':
          row.categoryColor.push('green');
          break;
        case 'Fiction':
          row.categoryColor.push('purple');
          break;
        case 'Animation':
          row.categoryColor.push('red');
          break;
        case 'Comedy':
          row.categoryColor.push('yell');
          break;
        case 'Adventure':
          row.categoryColor.push('orange');
          break;
      }
    });
    if (row.edit == false) {
      undoEditMovies = {
        name: row.name,
        src: row.src,
        rating: row.rating,
        category: row.category,
        categoryColor: row.categoryColor,
        start: row.start,
        end: row.end,
        date: row.date,
      };
      undoMoviesId = id;
      this.startto24(row);
      this.endto24(row);
      row.date = row.date.replace(/\//g, '-');
      row.edit = true;
    } else {
      row.edit = false;
      this.startto12(row);
      this.endto12(row);
      row.date = row.date.replace(/-/g, '/');
      this.service.EditMovie(row, id);
      this.openSnackBar('editsuccess');
    }
  }
  AddtoDelete(n) {
    this.movies.forEach((movie) => {
      if (movie.id == n) {
        if (movie.checked == false) {
          this.delete.push(n);
        } else {
          for (var i = 0; i < this.delete.length; i++) {
            if (this.delete[i] == n) {
              this.delete.splice(i, 1);
            }
          }
        }
      }
    });
  }
  DeleteAll() {
    if (this.deleteAll == true) {
      this.movies.forEach((element) => {
        this.AddtoDelete(element.id);
        element.checked = true;
      });
    } else {
      this.movies.forEach((element) => {
        element.checked = false;
        this.delete = [];
      });
    }
    this.deleteAll = false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialogRef = this.dialog.open(AddmovieComponent);
    this.dialogRef.afterClosed().subscribe((result) => {});
  }
  DeleteMovie() {
    if (
      this.delete.length == 0 &&
      this.displayedColumns[this.displayedColumns.length - 1] != 'id'
    ) {
      this.openSnackBar('selectdelete');
      this.displayedColumns.push('id');
      for (var i = 0; i < this.displayedColumns.length; i++) {
        if (this.displayedColumns[i] == 'edit') {
          this.displayedColumns.splice(i, 1);
        }
      }
    } else {
      if (this.delete.length == 0) {
        this.openSnackBar('empty');
        for (var i = 0; i < this.displayedColumns.length; i++) {
          if (this.displayedColumns[i] == 'id') {
            this.displayedColumns.splice(i, 1);
          }
        }
        this.displayedColumns.push('edit');
      } else {
        this.delete.forEach((element) => {
          this.movies.forEach((movie) => {
            if (movie.id == element) {
              undoMovies.push(movie);
              this.ref = this.firestorage.refFromURL(movie.src);
              // this.ref.getMetadata().subscribe((res) => {
              //   undoFile = res;
              // });
              let x = element;
              setTimeout(() => {
                if (undo == false) {
                  this.ref.delete();
                }
              }, 6000);
            }
          });
          this.service.DeleteMovie(element);
        });
        this.openSnackBar('deletesuccess');
        this.delete = [];
        for (var i = 0; i < this.displayedColumns.length; i++) {
          if (this.displayedColumns[i] == 'id') {
            this.displayedColumns.splice(i, 1);
          }
        }
        this.displayedColumns.push('edit');
        setTimeout(() => {
          undoMovies = [];
        }, 4000);
      }
    }
  }
  openSnackBar(n) {
    if (n == 'selectdelete') {
      this._snackBar.openFromComponent(SelectDeleteComponent, {
        duration: 4000,
        panelClass: ['snackbar'],
      });
    } else if (n == 'empty') {
      this._snackBar.openFromComponent(EmptyDeleteComponent, {
        duration: 4000,
        panelClass: ['snackbar'],
      });
    } else if (n == 'deletesuccess') {
      this._snackBar.openFromComponent(DeleteSuccessComponent, {
        duration: 4000,
        panelClass: ['snackbar'],
      });
    } else if (n == 'editsuccess') {
      this._snackBar.openFromComponent(EditSuccessComponent, {
        duration: 4000,
        panelClass: ['snackbar'],
      });
    }
  }
  endto12(n) {
    var H = +n.end.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? ' AM' : ' PM';
    n.end = h + n.end.substr(2, 3) + ampm;
  }
  endto24(n) {
    var ampm = n.end.substr(-2, 2);
    if (ampm == 'AM') {
      n.end = n.end.slice(0, -3);
      if (n.end.length < 5 && n.end.slice(0, 2) != '12') {
        n.end = '0' + n.end;
      } else if (n.end.slice(0, 2) == '12') {
        n.end = '00' + n.end.slice(n.end.search(/:/), n.end.length);
      }
    } else if (ampm == 'PM' && n.end.slice(0, -6) == '12') {
      n.end = '12' + n.end.slice(n.end.search(/:/), -3);
    } else {
      var x = n.end.search(/:/);
      var h = +n.end.slice(0, x) + 12;
      n.end = h + n.end.slice(x, -3);
    }
  }
  startto12(n) {
    var H = +n.start.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? ' AM' : ' PM';
    n.start = h + n.start.substr(2, 3) + ampm;
  }
  startto24(n) {
    var ampm = n.start.substr(-2, 2);
    if (ampm == 'AM') {
      n.start = n.start.slice(0, -3);
      if (n.start.length < 5 && n.start.slice(0, 2) != '12') {
        n.start = '0' + n.start;
      } else if (n.start.slice(0, 2) == '12') {
        n.start = '00' + n.start.slice(n.start.search(/:/), n.start.length);
      }
    } else if (ampm == 'PM' && n.start.slice(0, -6) == '12') {
      n.start = '12' + n.start.slice(n.start.search(/:/), -3);
    } else {
      var x = n.start.search(/:/);
      var h = +n.start.slice(0, x) + 12;
      n.start = h + n.start.slice(x, -3);
    }
  }
}

@Component({
  selector: 'select-delete-snack',
  templateUrl: 'select-delete-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
    `,
  ],
})
export class SelectDeleteComponent {}

@Component({
  selector: 'empty-delete-snack',
  templateUrl: 'empty-delete-snack.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
    `,
  ],
})
export class EmptyDeleteComponent {}
@Component({
  selector: 'delete-success-snack',
  templateUrl: 'delete-success-snack.html',
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
export class DeleteSuccessComponent {
  ref!: AngularFireStorageReference;
  constructor(
    private movieser: MoviesService,
    private firestorage: AngularFireStorage
  ) {}

  UndoDelete() {
    undo = true;
    undoMovies.forEach((movie) => {
      this.movieser.AddMovie(movie);
    });
    undoMovies = [];
    setTimeout(() => {
      undo = false;
    }, 5000);
  }
}
@Component({
  selector: 'edit-success-snack',
  templateUrl: 'edit-success-snack.html',
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
export class EditSuccessComponent {
  constructor(private movieser: MoviesService) {}
  UndoEdit() {
    this.movieser.EditMovie(undoEditMovies, undoMoviesId);
  }
}
