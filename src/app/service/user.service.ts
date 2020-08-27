import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IUser } from '../models/IUser';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  users: Observable<IUser[]>;

  collectionName = 'table-user';
  valueAdmin = 'Admin';
  valueSuperAdmin = 'SuperAdmin';
  result;
  registerForm: FormGroup;
  

  constructor(private afs: AngularFirestore, private router: Router, private afAuth: AngularFireAuth) { }

  readUser() {
    return this.afs.collection(`${this.collectionName}`, (ref) => 
      ref.orderBy('createdAt', 'desc')
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
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      type: 'Normal',
      createdAt: new Date(),
      tel: user.tel,
    }

    const usersCollection = this.afs.collection(`${this.collectionName}`);
    return usersCollection.add(newUser);
  }

  createAdminUser (user) { //créer l'utilisateur dans une collection
 
  const  newUser = {
    uid: user.uid, //Je prends ici l'id de l'utilisateur
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    type: '',
    createdAt: new Date(),
    tel: user.tel,
  }

  const usersCollection = this.afs.collection(`${this.collectionName}`);
  return usersCollection.add(newUser);
}
    /*createUsertWithUID(user) {
    return this.userCollection?.doc(`${this.collectionName}-${user.uid}`).set({
      uid: user.uid,
      displayName: user.displayName,
      createdAt: new Date,
    });
  }*/

  /*createAdminUser(email, name, type, createdAt, tel) {
    return this.afs
      .collection(`${this.collectionName}`)
      .add({ email, name, type, createdAt, tel });
  }*/

   /*createAdminUsertWithUID(user) {
    return this.userCollection?.doc(`${this.collectionName}-${user.uid}`).set({ //Question : problème ici avec le .set
      uid: user.uid,
      email: user.email,
      type: '',
      createdAt: new Date,
      //createdAt: Date.now(),
    });
  }*/
  getUsers() {
    return this.afs.collection(`${this.collectionName}`).valueChanges({ idField: 'id'});
  }

  getUser(id) {
    return this.afs?.doc(`${this.collectionName}/${id}`).valueChanges();
  }

  updateUserWithUID(user) {
    return this.afs
      .collection(`${this.collectionName}`)
      ?.doc(`${this.collectionName}-${user.uid}`)
  }

  deleteUser(id) { 
    return this.afs
      ?.doc<IUser>(`${this.collectionName}/${id}`)
      .delete();
  }
}