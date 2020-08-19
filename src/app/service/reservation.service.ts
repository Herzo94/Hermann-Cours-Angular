import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/firestore';
import { IReservation } from '../models/IReservation';
import { Observable } from 'rxjs';
import { IPersonalReservation } from '../models/IPersonalReservation';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private personalReservationCollection: AngularFirestoreCollection<IPersonalReservation>;
  personalReservation: Observable<IPersonalReservation[]>;

  constructor(private afs: AngularFirestore) {
    this.personalReservationCollection = afs.collection<IPersonalReservation>(
      'personnal-reservation'
    );
    this.personalReservation = this.personalReservationCollection.valueChanges();
  }

  readPersonalReservationByUID(id: string) { /*Question ici comment afficher les réservations d'un utilisateur*/
    return this.afs
      .collection('personnal-reservation', (ref) => ref.where('id', '==', id))
      .valueChanges({ idField: 'id' });
  }

  /*createPersonalReservation(user) {
    return this.personalReservationCollection.doc(`ps-${user.uid}`).set({
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
      return this.personalReservationCollection.doc(`ps-${uid}`).set({
        uid,
        name,
        type,
        employe,
        date,
        heure,
        createdAt
      });
  }*/


  readReservation() {
    return this.afs.collection<IReservation>('table-reservation', (ref) =>
      ref.orderBy('date', 'asc')
      
    );
  }

  createReservation( name, type, employe, date, heure) {
    return this.afs
      .collection('table-reservation')
      .add({ name, type, employe, date, heure });
  }

  getByIdReservation(id): Observable<IReservation> { //je retourne un observable
    return this.afs.doc<IReservation>(`table-reservation/${id}`).valueChanges();
  }

  /*async getByIdReservation(){
    const datas = await this.afs.collection<IReservation>('table-reservation', (ref) =>
      ref.orderBy('date', 'desc')
    );
    datas.
  }*/

  /*getByIdReservation(id) { // ici je ne retournais pas d'observable, c'est pour ça que j'avais eu le problème lors du support avec Nico, le problème est que je ne pouvais pas typé en IPreservation
    return this.afs.doc(`table-reservation/${id}`).valueChanges();
  }*/

  //Update reservation
  updateReservation(reservation) {
    return this.afs.doc(`table-reservation/${reservation.id}`).update({
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
      .doc<IReservation>(`table-reservation/${id}`)
      .delete();
  }
}
