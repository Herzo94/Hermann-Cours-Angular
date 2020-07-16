import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { ReservationService } from 'src/app/service/reservation.service';
import { IReservation } from '../../models/IReservation';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';


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

  constructor(private reservationService: ReservationService, private router : Router, public authService : AuthService) { }

  async ngOnInit() {
    
    this.reservationsCollection = await this.reservationService.readReservation();
    this.sub = this.reservationsCollection.valueChanges({
      idField: 'id',
      
    }).subscribe(data => {
      this.reservations = data;
    }) 
  }

  searchReservation: string;

  public modifReservation(id){
    this.router.navigate([`reservation/${id}/edit`])
  }

  public deleteReservation(id){
    this.reservationService.deleteReservation(id)
  }
  
  /*public refreshReservations() {
    //this.reservationService.fetch()
  }*/

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}