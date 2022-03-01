import { environment } from 'src/environments/environment';
import { SelectedMovie } from 'src/app/interfaces/selected-movie';
import { Movie } from './../../interfaces/movie';
import { MoviesService } from '../../services/movies.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AngularFireStorageReference,
  AngularFireUploadTask,
  AngularFireStorage,
} from '@angular/fire/compat/storage';
import { Registration } from 'src/app/interfaces/registration';
import { RegistrationService } from 'src/app/services/registration.service';

let undoMovies: Movie[] = [];
let undoEditMovies: {};
let undoMoviesId;
let undo = false;
@Component({
  selector: 'app-edit-registartion',
  templateUrl: './edit-registartion.component.html',
  styleUrls: ['./edit-registartion.component.css'],
})
export class EditRegistartionComponent implements OnInit {
  delete: string[] = [];
  Registration: Registration[] = [];
  displayedColumns: string[] = [
    'src',
    'movename',
    'CarPlate',
    'passengers',
    'edit',
  ];
  row;
  deleteAll = false;
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  dataSource!: MatTableDataSource<SelectedMovie>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: RegistrationService,
    private _snackBar: MatSnackBar,
    private firestorage: AngularFireStorage
  ) {}
  ngOnInit() {
    this.service.GetRegistration().subscribe(
      (res) => {
        this.Registration = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });

        this.hi();
      },
      (err) => {
        alert('Error while fetching data');
      }
    );
  }
  hi() {
    this.Registration.forEach((element) => {
      if (environment.client.userId == element.clientId) {
        this.dataSource = new MatTableDataSource(element.selectedMovies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  formatLabel(value: number) {
    return value;
  }
  Edit(row, id) {
    // row.categoryColor = [];
    // row.category.forEach((category) => {
    //   switch (category) {
    //     case 'Action':
    //       row.categoryColor.push('blue');
    //       break;
    //     case 'Fantasy':
    //       row.categoryColor.push('pink');
    //       break;
    //     case 'Science':
    //       row.categoryColor.push('green');
    //       break;
    //     case 'Fiction':
    //       row.categoryColor.push('purple');
    //       break;
    //     case 'Animation':
    //       row.categoryColor.push('red');
    //       break;
    //     case 'Comedy':
    //       row.categoryColor.push('yell');
    //       break;
    //     case 'Adventure':
    //       row.categoryColor.push('orange');
    //       break;
    //   }
    // });
    // if (row.edit == false) {
    //   undoEditMovies = {
    //     name: row.name,
    //     src: row.src,
    //     rating: row.rating,
    //     category: row.category,
    //     categoryColor: row.categoryColor,
    //     start: row.start,
    //     end: row.end,
    //     date: row.date,
    //   };
    //   undoMoviesId = id;
    //   row.edit = true;
    // } else {
    //   row.edit = false;
    //   this.service.EditRegistartion(row, id);
    //   this.openSnackBar('editsuccess');
    // }
  }
  AddtoDelete(n) {
    // this.Registration.forEach((Register) => {
    //   if (Register.id == n) {
    //     if (Register.checked == false) {
    //       this.delete.push(n);
    //     } else {
    //       for (var i = 0; i < this.delete.length; i++) {
    //         if (this.delete[i] == n) {
    //           this.delete.splice(i, 1);
    //         }
    //       }
    //     }
    //   }
    // });
  }
  DeleteAll() {
    // if (this.deleteAll == true) {
    //   this.Registration.forEach((element) => {
    //     this.AddtoDelete(element.id);
    //     element.checked = true;
    //   });
    // } else {
    //   this.Registration.forEach((element) => {
    //     element.checked = false;
    //     this.delete = [];
    //   });
    // }
    // this.deleteAll = false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  DeleteMovie() {
    // if (
    //   this.delete.length == 0 &&
    //   this.displayedColumns[this.displayedColumns.length - 1] != 'id'
    // ) {
    //   this.openSnackBar('selectdelete');
    //   this.displayedColumns.push('id');
    //   for (var i = 0; i < this.displayedColumns.length; i++) {
    //     if (this.displayedColumns[i] == 'edit') {
    //       this.displayedColumns.splice(i, 1);
    //     }
    //   }
    // } else {
    //   if (this.delete.length == 0) {
    //     this.openSnackBar('empty');
    //     for (var i = 0; i < this.displayedColumns.length; i++) {
    //       if (this.displayedColumns[i] == 'id') {
    //         this.displayedColumns.splice(i, 1);
    //       }
    //     }
    //     this.displayedColumns.push('edit');
    //   } else {
    //     this.delete.forEach((element) => {
    //       this.Registration.forEach((Register) => {
    //         if (Register.id == element) {
    //           undoMovies.push(Register);
    //           this.ref = this.firestorage.refFromURL(Register.selectedMovies.src);
    //           // this.ref.getMetadata().subscribe((res) => {
    //           //   undoFile = res;
    //           // });
    //           let x = element;
    //           setTimeout(() => {
    //             if (undo == false) {
    //               this.ref.delete();
    //             }
    //           }, 6000);
    //         }
    //       });
    //       this.service.Delet(element);
    //     });
    //     this.openSnackBar('deletesuccess');
    //     this.delete = [];
    //     for (var i = 0; i < this.displayedColumns.length; i++) {
    //       if (this.displayedColumns[i] == 'id') {
    //         this.displayedColumns.splice(i, 1);
    //       }
    //     }
    //     this.displayedColumns.push('edit');
    //     setTimeout(() => {
    //       undoMovies = [];
    //     }, 4000);
    //   }
    // }
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
