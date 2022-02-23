import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Movie } from 'src/app/interfaces/movie';
import { MoviesService } from 'src/app/services/movies.service';
export interface x {
  date: string;
  tab: string;
}
@Component({
  selector: 'app-in-theater',
  templateUrl: './in-theater.component.html',
  styleUrls: ['./in-theater.component.css'],
})
export class InTheaterComponent implements OnInit {
  day: x[] = [];
  movies: Movie[] = [];
  selected = new FormControl(2);

  constructor(private movieservice: MoviesService) {}

  ngOnInit(): void {
    this.movieservice.GetMovies().subscribe(
      (res) => {
        this.movies = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
        this.GetDay();
      },
      (err) => {
        alert('Error while fetching data');
      }
    );
  }
  GetDay() {
    let date: string[] = [];
    let x: {
      date: string;
      tab: string;
    };
    this.movies.forEach((movie) => {
      date.push(movie.date);
    });
    date = date.sort();
    date.forEach((element) => {
      let day = '';
      let getDay = new Date(element);
      let dayNumber = getDay.getDay();
      switch (dayNumber) {
        case 0:
          day = 'SUN';
          break;
        case 1:
          day = 'MON';
          break;
        case 2:
          day = 'TUE';
          break;
        case 3:
          day = 'WED';
          break;
        case 4:
          day = 'THU';
          break;
        case 5:
          day = 'FRI';
          break;
        case 6:
          day = 'SAT';
          break;
      }
      if (element[element.length - 2] == '/') {
        let Day = day + ' 0' + element.slice(-1, element.length);
        x = {
          date: element,
          tab: Day,
        };
        var found = false;
        for (var i = 0; i < this.day.length; i++) {
          if (this.day[i].date == element) {
            found = true;
            break;
          }
        }
        if (found == false) {
          this.day.push(x);
        }
      } else {
        let Day = day + ' ' + element.slice(-5, element.length);
        x = {
          date: element,
          tab: Day,
        };
        var found = false;
        for (var i = 0; i < this.day.length; i++) {
          if (this.day[i].date == element) {
            found = true;
            break;
          }
        }
        if (found == false) {
          this.day.push(x);
        }
      }
    });
  }
}
