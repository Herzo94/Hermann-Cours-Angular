import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ReservationService } from 'src/app/service/reservation.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { ModalController } from '@ionic/angular';
import { IReservation } from '../models/IReservation';
import { InsertMesReservationComponent } from '../mes-reservations/insert-mes-reservation/insert-mes-reservation.component';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-mes-reservations',
  templateUrl: './mes-reservations.component.html',
  styleUrls: ['./mes-reservations.component.css']
})
export class MesReservationsComponent implements OnInit, OnDestroy {
  private mesReservationsCollection: AngularFirestoreCollection<IReservation>;
  user;
  reservation;
  mesReservations: IReservation[] = [];
  mesReservations$: Observable<IReservation[]>
  sub;
  personalSpace;
  public searchTerm: string = '';

  constructor(private afAuth: AngularFireAuth, private reservationService: ReservationService, private router : Router, public authService : AuthService, public modalController: ModalController) { }
  
  ngOnInit() { 
  
    this.sub = this.afAuth.authState.subscribe((user) => {
      console.log('user', user);

      this.user = user;
      if (this.user) {
         console.log(this.reservationService.readPersonalReservationByUID(user.uid));

        this.reservationService.readPersonalReservationByUID(user.uid).subscribe(
          (data) => {

            console.log('ngOnInt readPersonnalSpaceById / data', data);
            this.personalSpace = data;

            console.log('ngOnInt readPersonnalReservationById / data', data);
            this.reservation = data;
            console.log('mes reservations data : -> ', this.reservation);
           
            console.log('mes reservations$  OBSERVABLE : -> ', this.mesReservations$);
      
            if (!data || data.length === 0) {
              console.log(`Creating a new personal reservation for ${user.displayName}`);
              this.reservationService.createReservationWithUID(this.personalSpace);
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
  searchReservation: string;

  public async insertReservation(){
  
      const modal = await this.modalController.create({
        component: InsertMesReservationComponent,
        cssClass: 'my-custom-class',
      });
      return await modal.present();  
  }

  async  deleteReservation(id){
    if(confirm('Etes-vous sûr de vouloir supprimer cette reservation ?')) {

    this.reservationService.deleteReservation(id)
    await Toast.show({
          text: 'Suppression effectuée avec succès!'
        });
  } else {

    return null;
  }
 
  }

  ngOnDestroy() {//obliger pour que ça soit perdormant //pas bloquer ressource système
    this.sub.unsubscribe();
  }

}
