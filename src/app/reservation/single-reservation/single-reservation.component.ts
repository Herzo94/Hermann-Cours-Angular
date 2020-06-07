import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-reservation',
  templateUrl: './single-reservation.component.html',
  styleUrls: ['./single-reservation.component.css']
})
export class SingleReservationComponent implements OnInit {

  name: string = 'TestNom';
  date: string = 'TestDate';

  constructor() { }

  ngOnInit(): void {
  }

}
