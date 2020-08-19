import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReservationService } from 'src/app/service/reservation.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { ModalController } from '@ionic/angular';
import { IPersonalReservation } from '../../models/IPersonalReservation';


@Component({
  selector: 'app-personnal-reservation',
  templateUrl: './personnal-reservation.component.html',
  styleUrls: ['./personnal-reservation.component.css']
})
export class PersonnalReservationComponent implements OnInit {
  
  user;
  personalReservation;
  personnalReservations: IPersonalReservation[] = [];
  

  constructor(private afAuth: AngularFireAuth, private reservationService: ReservationService, private router : Router, public authService : AuthService, public modalController: ModalController) { }

  
  ngOnInit() { 
  
    this.afAuth.authState.subscribe((user) => {
      console.log('user', user);

      this.user = user;
      if (this.user) {
         console.log(this.reservationService.readPersonalReservationByUID(user.uid));

        this.reservationService.readPersonalReservationByUID(user.uid).subscribe(
          (data) => {
            console.log('ngOnInt readPersonnalReservationById / data', data);
            this.personalReservation = data;
            if (!data || data.length === 0) {
              console.log(`Creating a new space for ${user.displayName}`);
              //this.reservationService.createPersonalReservation(this.uid, this.name, this.type);
              //lié l'élément ici à une collection par exemple
            }
          },
          (err) => {
            console.error('readPersonalSpaceById error', err);
          }
        );
      }
    });
  }

}
