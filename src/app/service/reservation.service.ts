import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Reservation } from './../models/reservation'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private afs: AngularFirestore) {}

  readReservation() {
    return this.afs.collection<Reservation>('table-reservation', (ref) =>
      ref.orderBy('date', 'asc')
    );
  }

  /*createReservation( name, type, employe, date, heure) {
    return this.afs
      .collection('table-reservation')
      .add({ name, type, employe, date, heure });
  }*/

  

  /*deleteReservation(reservation) {
    return this.afs
      .doc<Reservation>(`table-reservation/${reservation.id}`)
      .delete();
  }*/
}
