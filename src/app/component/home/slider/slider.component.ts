import { environment } from './../../../../environments/environment';
import { Movie } from './../../../interfaces/movie';
import { MoviesService } from '../../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  movies: Movie[] = [];
  loggedin = 'no';
  responsiveOptions;
  constructor(
    private movieservice: MoviesService,
    private _snackBar: MatSnackBar
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  ngOnInit() {
    this.movieservice.GetMovies().subscribe(
      (res) => {
        this.movies = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert('Error while fetching data');
      }
    );
    let isadmin = environment.client.isadmin;
    if (isadmin == 'true' || isadmin == 'false') {
      this.loggedin = 'yes';
    }
  }
  openSnackBar() {
    if (this.loggedin == 'no') {
      this._snackBar.openFromComponent(LogInToAddRegistrationComponent, {
        duration: 7000,
        panelClass: ['snackbar'],
      });
    } else {
      this._snackBar.openFromComponent(AddRegistrationComponent, {
        duration: 7000,
        panelClass: ['snackbar'],
      });
    }
  }
}
@Component({
  selector: 'logIn-to-add-registration-snack',
  templateUrl: 'logIn-to-add-registration.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
    `,
  ],
})
export class LogInToAddRegistrationComponent {}
@Component({
  selector: 'add-registration-snack',
  templateUrl: 'add-registration.html',
  styles: [
    `
      span {
        color: #c2185b;
      }
    `,
  ],
})
export class AddRegistrationComponent {}
