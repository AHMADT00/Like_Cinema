import { Movie } from './../../../interfaces/movie';
import { MoviesService } from '../../../services/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movieselect',
  templateUrl: './movieselect.component.html',
  styleUrls: ['./movieselect.component.css'],
})
export class MovieselectComponent implements OnInit {
  movies: Movie[] = [];
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
}
