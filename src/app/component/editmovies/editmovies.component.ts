import { Movie } from './../../interfaces/movie';
import { MoviesService } from '../../services/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editmovies',
  templateUrl: './editmovies.component.html',
  styleUrls: ['./editmovies.component.css'],
})
export class EditmoviesComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private service: MoviesService) {}
  ngOnInit() {
    this.service.GetMovies().subscribe(
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
