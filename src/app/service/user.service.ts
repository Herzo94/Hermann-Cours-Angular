import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName = 'user';

  constructor(private afs: AngularFirestore) { }

  createUser(user) {
    const  newUser = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: new Date()
    }

    const usersCollection = this.afs.collection(`${this.collectionName}`); //créer ici le typage pour l'interface <IUser> -> 3:51 à la vidéo
    return usersCollection.add(newUser);
  }

  getUsers() {
    return this.afs.collection(`${this.collectionName}`).valueChanges({ idField: 'id'});
  }

  getUser(id) {
    return this.afs.doc(`${this.collectionName}/${id}`).valueChanges();
  }
}
