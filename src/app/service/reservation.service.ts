import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/firestore';
import { IReservation } from '../models/IReservation';

import { IPersonalReservation } from '../models/IPersonalReservation';
import { firestore } from 'firebase';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {
  private personalReservationCollection: AngularFirestoreCollection<IReservation>;
  personalReservation: Observable<IReservation[]>;
  collectionName = 'table-reservation';

  constructor(private afs: AngularFirestore) {
    this.personalReservationCollection = afs.collection<IReservation>(
      `${this.collectionName}`
    );
    this.personalReservation = this.personalReservationCollection.valueChanges();
  }

  createReservation( name, type, employe, date, heure) {
    return this.afs
      .collection(`${this.collectionName}`)
      .add({ name, type, employe, date, heure });
  }

  readReservation() {
    return this.afs.collection<IReservation>(`${this.collectionName}`, (ref) =>
      ref.orderBy('date', 'asc')
    );
  }

  /*getReservations() {
    return this.afs.collection(`${this.collectionName}`).valueChanges({ idField: 'id'}); 
  }

  getByIdReservation(id): Observable<IReservation> { //je retourne un observable
    return this.afs.doc<IReservation>(`${this.collectionName}/${id}`).valueChanges();
  }
  
  getUsers() {
    return this.afs.collection(`${this.collectionName}`).valueChanges({ idField: 'id'}); 
  }

  getUser(id) {
    return this.afs.doc(`${this.collectionName}/${id}`).valueChanges();
  }*/
  
  //Update reservation
  updateReservation(reservation) {
    return this.afs.doc(`${this.collectionName}/${reservation.id}`).update({
      ...reservation,
      name: reservation.name,
      type : reservation.type,
      employe: reservation.employe,
      date: reservation.date,
      heure: reservation.heure
    });
  }

  deleteReservation(id) { 
    return this.afs
      .doc<IReservation>(`${this.collectionName}/${id}`)
      .delete();
  }
}
