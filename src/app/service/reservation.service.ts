import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IReservation } from '../models/IReservation';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationCollection: AngularFirestoreCollection<IReservation>;
  personalReservation: Observable<IReservation[]>;
  collectionName = 'table-reservation'



  constructor(private afs: AngularFirestore, private router: Router) { }

  readReservation() {
    return this.afs.collection<IReservation>(`${this.collectionName}`, (ref) =>
      ref.orderBy('date', 'asc')
    );
  }

  readPersonalReservationByUID(uid: string) { /*Question ici comment afficher les réservations d'un utilisateur en faisant une requête ?*/
    return this.afs
    .collection(`${this.collectionName}`, (ref) => ref.where('uid', '==', uid))
    .valueChanges({ idField: 'id' });
}

  createReservation(name, type, employe, date, heure, uid) {
    return this.afs
      .collection(`${this.collectionName}`)
      .add({ name, type, employe, date, heure, uid });
  }

  createReservationWithUID(user) {
    return this.reservationCollection?.doc(`${this.collectionName}-${user.uid}`).set({
      name: '',
      type: '',
      employe : '',
      date: '', 
      heure: '',
      uid: user.uid, 
      //createdAt: Date.now(),
    });
  }

  /*createPersonalReservation(user) {
    return this.personalReservationCollection?.doc(`ps-${user.uid}`).set({
      uid: user.uid,
      //displayName: user.displayName,
      name: reservation.name,
      type : reservation.type,
      employe: reservation.employe,
      date: reservation.date,
      heure: reservation.heure
      createdAt: Date.now(),

    });
  }*/

  /*createPersonalReservation(){
      return this.personalReservationCollection?.doc(`ps-${uid}`).set({
        uid,
        name,
        type,
        employe,
        date,
        heure,
        createdAt
      });
  }*/

  getByIdReservation(id): Observable<IReservation> { //je retourne un observable
    return this.afs?.doc<IReservation>(`${this.collectionName}/${id}`).valueChanges();
  }

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

  updateReservationWithUID(user) {
    return this.afs
      .collection(`${this.collectionName}`)
      //.doc(`ps-${user.uid}`)
      .doc(`${this.collectionName}-${user.uid}`)
  }

  deleteReservation(id) { 
    return this.afs
      ?.doc<IReservation>(`${this.collectionName}/${id}`)
      .delete();
  }
}
