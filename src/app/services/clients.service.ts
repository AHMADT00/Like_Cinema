import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private firestore: AngularFirestore) {}

  AddClient(client) {
    return this.firestore.collection('Clients').add(client);
  }
  GetClient() {
    return this.firestore.collection('Clients').snapshotChanges();
  }
  EditClient(client, clientid) {
    this.firestore.doc('Clients/' + clientid).update(client);
  }
  DeleteClient(clientid) {
    this.firestore.doc('Clients/' + clientid).delete();
  }
}
