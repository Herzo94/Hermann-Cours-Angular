import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PersonalReservationService } from 'src/app/service/personal-reservation.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { ModalController } from '@ionic/angular';
import { IPersonalReservation } from '../../models/IPersonalReservation';
import { InsertPersonalReservationComponent } from '../insert-personal-reservation/insert-personal-reservation.component';
import { UserService } from '../../service/user.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/IUser';


@Component({
  selector: 'app-personnal-reservation',
  templateUrl: './personnal-reservation.component.html',
  styleUrls: ['./personnal-reservation.component.css']
})
export class PersonnalReservationComponent implements OnInit {
  
  user;
  personalReservation;
  personnalReservations: IPersonalReservation[] = [];
  public searchTerm: string = '';
  users$: Observable<any[]>;
  
  

  constructor(private afAuth: AngularFireAuth, private personalReservationService: PersonalReservationService, private router : Router, public authService : AuthService, public modalController: ModalController, private userService: UserService) 
  
  {
    this.users$ = this.userService.getUsers() as Observable<unknown[]>;
  }

  
  ngOnInit(): void { 
  
    //this.users$ = this.userService.getUsers(); //initialisation à l'observable du getUsers() sans id
    

    /*this.afAuth.authState.subscribe((user) => {
      console.log('user', user);

      this.user = user;
      if (this.user) {
         console.log(this.personalReservationService.readPersonalSpaceByUID(user.uid));

        this.personalReservationService.readPersonalSpaceByUID(user.uid).subscribe(
          (data) => {
            console.log('ngOnInt readPersonnalReservationById / data', data);
            this.personalReservation = data;
            if (!data || data.length === 0) {
              console.log(`Creating a personnal reservation space for ${user.displayName}`);
              //this.reservationService.createPersonalReservation(this.uid, this.name, this.type);
              //lié l'élément ici à une collection par exemple
            }
          },
          (err) => {
            console.error('readPersonalSpaceById error', err);
          }
        );
      }
    });*/
  }

    public async insertPersonalReservation(){
    
      const modal = await this.modalController.create({
        component: InsertPersonalReservationComponent,
        cssClass: 'my-custom-class',
      });
      return await modal.present();  
  }
}
