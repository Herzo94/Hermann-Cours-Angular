import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IUser } from '../models/IUser';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCollection: AngularFirestoreCollection<IUser>;
  users: Observable<IUser[]>;

  collectionName = 'table-user';
  valueAdmin = 'Admin';
  valueSuperAdmin = 'SuperAdmin';
  

  constructor(private afs: AngularFirestore, private router: Router) { }

  readUser() {
    return this.afs.collection(`${this.collectionName}`, (ref) => 
      ref.orderBy('createdAt', 'asc')
    );
  }

  readUserWithUID(uid: string) {
    return this.afs
      .collection(`${this.collectionName}`, (ref) => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' });
  }

  createUser (user) { //créer l'utilisateur dans une collection
    const  newUser = {
      uid: user.uid, //Je prends ici l'id de l'utilisateur
      //name: '',
      email: user.email,
      emailVerified: user.emailVerified,
      type: '',
      createdAt: new Date(),
    }

    const usersCollection = this.afs.collection(`${this.collectionName}`); //créer ici le typage pour l'interface <IUser> -> 3:51 à la vidéo
    return usersCollection.add(newUser);
  }

  createUsertWithUID(user) {
    return this.userCollection.doc(`${this.collectionName}-${user.uid}`).set({
      uid: user.uid,
      displayName: user.displayName,
      createdAt: Date.now(),
    });
  }

  getUsers() {
    return this.afs.collection(`${this.collectionName}`).valueChanges({ idField: 'id'});
  }

  getUser(id) {
    return this.afs.doc(`${this.collectionName}/${id}`).valueChanges();
  }

  updateUserWithUID(user) {
    return this.afs
      .collection(`${this.collectionName}`)
      //.doc(`ps-${user.uid}`)
      .doc(`${this.collectionName}-${user.uid}`)
  }

  deleteUser(id) { 
    return this.afs
      .doc<IUser>(`${this.collectionName}/${id}`)
      .delete();
  }
}