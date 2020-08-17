import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IReservation } from '../models/IReservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private afs: AngularFirestore) {}

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

  readPersonalReservationByUID(id: string) { /*Question ici comment afficher les réservations d'un utilisateur*/
    return this.afs
      .collection('table-reservation', (ref) => ref.where('id', '==', id))
      .valueChanges({ idField: 'id' });
  }

  /*async getByIdReservation(){
    const datas = await this.afs.collection<IReservation>('table-reservation', (ref) =>
      ref.orderBy('date', 'asc')
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
