import { Movie } from './../../../interfaces/movie';
import { MoviesService } from '../../../services/movies.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SelectedMovie } from 'src/app/interfaces/selected-movie';

@Component({
  selector: 'app-movieselect',
  templateUrl: './movieselect.component.html',
  styleUrls: ['./movieselect.component.css'],
})
export class MovieselectComponent implements OnInit, OnChanges {
  @Input() next: boolean = false;
  @Output() eventfromchild: EventEmitter<SelectedMovie[]> = new EventEmitter<
    SelectedMovie[]
  >();
  movies: Movie[] = [];
  selected!: SelectedMovie;
  y: SelectedMovie[] = [];
  passengers: string[] = ['لا يوجد', 'شخص', 'شخصين', 'ثلاثة أشخاص'];
  constructor(private movieservice: MoviesService) {}

  ngOnInit(): void {
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
  }
  select(passenger, movie, index) {
    let y, x, i;
    x = document.getElementsByClassName('card');
    y = x[index].getElementsByTagName('mat-radio-button');
    for (i = 0; i < y.length; i++) {
      if (
        (y[i].className ==
          'mat-radio-button example-radio-button mat-accent ng-star-inserted not')
      ) {
        y[i].className =
          'mat-radio-button example-radio-button mat-accent ng-star-inserted mat-radio-checked';
      }
    }
    if (this.y.length == 0 && movie.checked) {
      this.selected = {
        id: movie.id,
        movieName: movie.name,
        passengers: passenger,
      };
      this.y.push(this.selected);
    } else if (movie.checked) {
      let found = false;
      for (let i = 0; i < this.y.length; i++) {
        if (this.y[i].id == movie.id) {
          this.y[i].passengers = passenger;
          found = true;
        } else if (
          this.y[i].id != movie.id &&
          i == this.y.length - 1 &&
          found == false
        ) {
          this.selected = {
            id: movie.id,
            movieName: movie.name,
            passengers: passenger,
          };
          this.y.push(this.selected);
        }
      }
    }
  }
  UnSelect(movie, index) {
    if (movie.checked) {
      for (let i = 0; i < this.y.length; i++) {
        if (this.y[i].id == movie.id) {
          this.y.splice(i, 1);
        }
      }
      let y, x, i;
      x = document.getElementsByClassName('card');
      y = x[index].getElementsByTagName('mat-radio-button');
      for (i = 0; i < y.length; i++) {
        if (
          (y[i].className ==
            'mat-radio-button example-radio-button mat-accent ng-star-inserted mat-radio-checked')
        ) {
          y[i].className =
            'mat-radio-button example-radio-button mat-accent ng-star-inserted not';
        }
      }
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.eventfromchild.emit(this.y);
  }
}
