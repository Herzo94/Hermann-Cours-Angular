import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { ReservationService } from 'src/app/service/reservation.service';
import { Reservation } from './../../models/reservation';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-reservation-view',
  templateUrl: './reservation-view.component.html',
  styleUrls: ['./reservation-view.component.css']
})

export class ReservationViewComponent implements OnInit, OnDestroy {
  private reservationsCollection: AngularFirestoreCollection<Reservation>;
  reservations$: Observable<Reservation[]>
  reservations: Reservation[] = [];
  sub;

  constructor(private reservationService: ReservationService) { }

  async ngOnInit() {
    console.log("CoucouResa");

    this.reservationsCollection = await this.reservationService.readReservation();
    console.log("reservationsCollection : ", this.reservationsCollection);
    this.sub = this.reservationsCollection.valueChanges({
      idField: 'id',
      
    }).subscribe(data => {
      this.reservations = data;
      console.log("data", data);
    })
    
  }

  searchReservation: string;

  
  /*public refreshReservations() {
    //this.reservationService.fetch()
  }*/

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}