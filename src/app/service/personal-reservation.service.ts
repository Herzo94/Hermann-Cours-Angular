import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/firestore';
import { IReservation } from '../models/IReservation';

import { IPersonalReservation } from '../models/IPersonalReservation';
import { firestore } from 'firebase';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalReservationService {
  private personalReservationCollection: AngularFirestoreCollection<IPersonalReservation>;
  personalReservations: Observable<IPersonalReservation[]>;
  collectionName = 'table-personnal-reservation';
  //collectionName = 'table-reservation';

  constructor(private afs: AngularFirestore) {
    //QUESTION : J'AI BESOIN DE DECOMMENTER CE QU'IL Y A EN DESSOUS VU QUE JE DOIS REMPLIR UNE LISTE NON ?
    /*this.personalReservationCollection = afs.collection<IPersonalReservation>(
      `${this.collectionName}`
    );
    this.personalReservations = this.personalReservationCollection.valueChanges();*/
  }

  createPersonnalReservation(user: (IPersonalReservation)) {
    const newReservation: IPersonalReservation = {
      uid: user.uid,
      name: 'NomàDéfinir',
      type: 'TypeàDéfinir',
      employe: 'EmployéàDéfinir',
      date: 'DateàDéfinir', 
      heure: 'HeureàDéfinir',
    };

    const reservationsCollection = this.afs.collection<IPersonalReservation>(this.collectionName);
    return reservationsCollection.add(newReservation);
  }

  getReservations() {
    return this.afs.collection(this.collectionName)
    .valueChanges({ idField: 'id' }) as Observable<unknown[]>;
  }

  getReservationByUserId(uid: string) {
    return this.afs
    .doc(`${this.collectionName}/${uid}`)
    .valueChanges() as Observable<unknown>;
  }
  
  /*getPersonalReservation(): Observable<IPersonalReservation[]> {
    return this.personalReservations;
  }

  getPersonalReservationByUID(uid: string) { //Question ici comment afficher les réservations d'un utilisateur
    return this.afs
      .collection(`${this.collectionName}`, (ref) => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' });  
  }*/

  /*
    getAppointementsByClientId(id) 
    //en lisant l'id depuis le user retourné par l'autentification de Firebase. J'ai détaillé la chose  la dernière journée en recourant à where
  
    readPersonalSpaceByUID(uid: string) {
    return this.afs
      .collection('personal-spaces', (ref) => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' });
  }
  */

 
  /*createPersonalReservation( name, type, employe, date, heure) {
    return this.afs
      .collection(`${this.collectionName}`)
      .add({ name, type, employe, date, heure });
  }*/

  /*createPersonalReservation(user, name, type, employe, date, heure) {
    return this.personalReservationCollection.doc(`${this.collectionName}-${user.uid}`).set({
      uid: user.uid, //ID utilisateur à insérer dans ma bdd (Clé étrangère)
      displayName: user.displayName,
      createdAt: Date.now(),
      name: "Test", 
      type: "Test", 
      employe: "Test", 
      date: "Test", 
      heure: "Test", 
    });
    //.add({ name, type, employe, date, heure });

    const usersCollection = this.afs.collection(`${this.collectionName}`);
    return usersCollection.add(newUser);

    console.log('User ID de la réservation en cours : ',user.uid)
  }*/
  
}
