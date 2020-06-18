import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  template: `<router-outlet></router-outlet>`
})
export class ReservationComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {
  }

}





  
  /*public refreshReservations() {
    //this.reservationService.fetch()
  }*/
/*
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}*/

/*import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { ReservationService } from 'src/app/service/reservation.service';
import { IReservation } from '../models/IReservation';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-reservation',
  //templateUrl: './reservation.component.html',
  template: `<router-outlet></router-outlet>`
})

export class ReservationComponent implements OnInit, OnDestroy {
  private reservationsCollection: AngularFirestoreCollection<IReservation>;
  reservations$: Observable<IReservation[]>
  reservations: IReservation[] = [];
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
/*
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}*/