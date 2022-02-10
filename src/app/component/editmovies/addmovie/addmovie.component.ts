import { Movie } from './../../../interfaces/movie';
import { MoviesService } from './../../../services/movies.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css'],
})
export class AddmovieComponent {
  movie!: Movie;
  src;
  name;
  rating;
  category!: string[];
  start;
  end;
  date;
  categoryColor: string[] = [];

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

  constructor(private service: MoviesService) {}

  formatLabel(value: number) {
    return value;
  }

  AddMovie() {
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
    this.service.AddMovie(this.movie);
    this.categoryColor = [];
  }
}
