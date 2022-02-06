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
}
