import { MatDialog } from '@angular/material/dialog';
import { Movie } from './../../interfaces/movie';
import { MoviesService } from '../../services/movies.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { MatSnackBar } from '@angular/material/snack-bar';

let undoMovies: Movie[] = [];
let undoEditMovies: {};
let undoMoviesId;

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
  dataSource!: MatTableDataSource<Movie>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: MoviesService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
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
  Edit(row, id) {
    if (row.edit == false) {
      undoMoviesId = id;
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
      row.edit = true;
    } else if (row.edit == true) {
      row.edit = false;
      this.openSnackBar('editsuccess');
      this.to12(row)
      this.service.EditMovie(row, id);
      this.to24(row)
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
  to12(n) {
    var H = +n.end.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? ' AM' : ' PM';
    n.end = h + n.end.substr(2, 3) + ampm;
  }
  to24(n){
    var H = +n.end.substr(5, 3);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? ' AM' : ' PM';
    n.end = h + n.end.substr(2, 3) + ampm;
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
  constructor(private movieser: MoviesService) {}

  UndoDelete() {
    undoMovies.forEach((movie) => {
      this.movieser.AddMovie(movie);
    });
    undoMovies = [];
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
