import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  template: `<ion-router-outlet></ion-router-outlet>`,
  //templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']

 
})
export class ReservationComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {
  }

}

/*
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}*/