import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  template: '<app-reservation-view></app-reservation-view>',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {
  public noReservationTemplate: string = 'Pas de tableau';
  public searchText: string = 'testResa';

  constructor() { }

  ngOnInit(): void {}

  searchReservation: string;


  public reservations: Reservation[] = [
  {
    "id": 1,
    "reservationName": "Leaf Rake",
    "reservationDate": "GDN-0011"
  },
  {
    "id": 2,
    "reservationName": "Leaf Rake",
    "reservationDate": "GDN-0011"
  }
]
}

  export interface Reservation {
    id : number
    reservationName : string
    reservationDate : string 
  }


