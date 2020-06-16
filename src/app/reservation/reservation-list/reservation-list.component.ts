import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { ReservationService } from './../../service/reservation.service';
import { Reservation } from './../../models/reservation';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit,  OnDestroy {
  private reservationCollection: AngularFirestoreCollection<Reservation>;
  reservation$: Observable<Reservation[]>;
  reservations: Reservation[] = [];
  sub;

  constructor(private res: ReservationService) { }

  async ngOnInit() {
    this.reservationCollection = await this.res.readReservation();
    this.sub = this.reservationCollection.valueChanges({
      idField: 'id',
    }).subscribe(data => {
      this.reservations = data;
      console.log("data : ", data);
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
