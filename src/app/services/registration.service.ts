import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private firestore: AngularFirestore) {}

  GetRegistration() {
    return this.firestore.collection('Registration').snapshotChanges();
  }

  AddRegistration(data) {
    return this.firestore.collection('Registration').add(data);
  }
}
