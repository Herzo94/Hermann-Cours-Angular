import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from '../models/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName = 'table-user';
  valueAdmin = 'admin';
  valueSuperAdmin = 'superAdmin';
  

  constructor(private afs: AngularFirestore) { }

  /*readUser() {
    //this.afs.collection(`${this.collectionName}`);
    return this.afs.collection<IUser>('table-user');
  }*/

  createUser (user) { //créer l'utilisateur dans une collection
    const  newUser = {
      uid: user.uid, //Je prends ici l'id de l'utilisateur
      email: user.email,
      emailVerified: user.emailVerified,
      type: this.valueAdmin, //Question : C'est ici que je dois récupérer la valeur du champ "type" du formulaire de si c'est un super admin ou un admin simple. Mais je ne vois pas comment faire ?
      //this.userForm.value.type,
      createdAt: new Date(),
    }

    const usersCollection = this.afs.collection(`${this.collectionName}`); //créer ici le typage pour l'interface <IUser> -> 3:51 à la vidéo
    return usersCollection.add(newUser);
  }

  createSuperAdmin (user) { //créer l'utilisateur dans une collection
    const  newUser = {
      uid: user.uid, //Je prends ici l'id de l'utilisateur
      email: user.email,
      emailVerified: user.emailVerified,
      type: this.valueAdmin, //Question : C'est ici que je dois récupérer la valeur du champ "type" du formulaire de si c'est un super admin ou un admin simple. Mais je ne vois pas comment faire ?
      createdAt: new Date(),
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