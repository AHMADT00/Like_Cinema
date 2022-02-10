import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private firestore: AngularFirestore) {}

  GetMovies() {
    return this.firestore.collection('Movies').snapshotChanges();
  }
  AddMovie(movie) {
    return this.firestore.collection('Movies').add(movie);
  }
  EditMovie(movie, movieid) {
    this.firestore.doc('Movies/' + movieid).update(movie);
  }
  DeleteMovie(movieid) {
    this.firestore.doc('Movies/' + movieid).delete();
  }
}
