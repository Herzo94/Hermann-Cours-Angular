import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/firestore';
import { IReservation } from '../models/IReservation';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationCollection: AngularFirestoreCollection<IReservation>;
  reservations: Observable<IReservation[]>;

  constructor(private afs: AngularFirestore, private router: Router) { }

  readReservation() {
    return this.afs.collection<IReservation>('table-reservation', (ref) =>
      ref.orderBy('date', 'asc')
    );
  }

  readPersonalReservationByUID(uid: string) { /*Question ici comment afficher les réservations d'un utilisateur en faisant une requête ?*/
    return this.afs
    .collection('table-reservation', (ref) => ref.where('uid', '==', uid))
    .valueChanges({ idField: 'id' });
}

  createReservation(name, type, employe, date, heure, uid) {
    return this.afs
      .collection('table-reservation')
      .add({ name, type, employe, date, heure, uid });
  }

  createReservationWithUID(user) {
    return this.reservationCollection.doc(`table-reservation-${user.uid}`).set({
      name: '',
      type: '',
      employe : '',
      date: '', 
      heure: '',
      uid: user.uid, 
      //createdAt: Date.now(),
    });
  }

  getByIdReservation(id): Observable<IReservation> { //je retourne un observable
    return this.afs.doc<IReservation>(`table-reservation/${id}`).valueChanges();
  }

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

  updateReservationWithUID(user) {
    return this.afs
      .collection('table-reservation')
      //.doc(`ps-${user.uid}`)
      .doc(`table-reservation-${user.uid}`)
  }

  deleteReservation(id) { 
    return this.afs
      .doc<IReservation>(`table-reservation/${id}`)
      .delete();
  }
}
