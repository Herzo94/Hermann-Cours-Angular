import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { ReservationService } from 'src/app/service/reservation.service';
import { IReservation } from '../../models/IReservation';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  
})

export class ReservationListComponent implements OnInit, OnDestroy {
  private reservationsCollection: AngularFirestoreCollection<IReservation>;
  reservations$: Observable<IReservation[]>
  reservations: IReservation[] = [];
  sub;
  public searchTerm: string = '';

  constructor(private reservationService: ReservationService, private router : Router) { }

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

  public modifReservation(id){
    this.router.navigate([`reservation/${id}/edit`])
  }

  public deleteReservation(id){
    console.log("Hello Delete Resa");
    this.reservationService.deleteReservation(id)
  }
  
  /*public refreshReservations() {
    //this.reservationService.fetch()
  }*/

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}