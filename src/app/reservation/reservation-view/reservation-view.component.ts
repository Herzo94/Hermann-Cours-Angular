import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from './../../shared/model/reservation/reservation';
import { ReservationService } from './../../shared/model/reservation/reservation-service';

@Component({
  selector: 'app-reservation-view',
  templateUrl: './reservation-view.component.html',
  styleUrls: ['./reservation-view.component.css']
})
export class ReservationViewComponent implements OnInit {

  public reservations$: Observable<Reservation[]>

  constructor(public reservationService : ReservationService) { 
    this.reservations$ = reservationService.getReservations$()

  }

  ngOnInit(): void { }

  searchReservation: string;

  public refreshReservations() {
    this.reservationService.fetch()
  }
}
