import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { ReservationService } from 'src/app/service/reservation.service';
import { IReservation } from '../../models/IReservation';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalComponent } from 'src/app/modal/modal.component';
import { ReservationInsertComponent } from '../reservation-insert/reservation-insert.component';
import { ReservationEditComponent } from '../reservation-edit/reservation-edit.component';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']

})

export class ReservationListComponent implements OnInit, OnDestroy {
  private reservationsCollection: AngularFirestoreCollection<IReservation>;
  reservations$: Observable<IReservation[]>
  reservations: IReservation[] = [];
  sub;
  public searchTerm: string = '';

  constructor(private reservationService: ReservationService, private router : Router, public authService : AuthService, public modalController: ModalController, public alertController : AlertController) { }

  async ngOnInit() {
    
    this.reservationsCollection = await this.reservationService.readReservation();
    this.sub = this.reservationsCollection.valueChanges({
      idField: 'id',
      
    }).subscribe(data => {
      this.reservations = data;
    }) 
  }

  searchReservation: string;

  public async insertReservation(){
  
      const modal = await this.modalController.create({
        component: ReservationInsertComponent,
        cssClass: 'my-custom-class',
      });
      return await modal.present();  
  }

  public async modifReservation(id){
  
      const modal = await this.modalController.create({
        component: ReservationEditComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          data: this.reservations.find( element => element.id === id )
        }
      });
      return await modal.present();  
  }   

  async  deleteReservation(id){
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Supprimer une reservation',
      subHeader: "Voulez-vous vraiment supprimer cette reservation ?",
      buttons: [
        {
         text: 'Oui',
         role:'delete',
         handler: () =>{
           Toast.show({ 
            text: 'Suppression effectuée avec succès!'
          });
          this.reservationService.deleteReservation(id)
           console.log('delete clicked');
           
         }
        },
        {
          text: 'Non',
          role:'NoDelete',
          handler: () =>{
            console.log('Cancel clicked');
          }
         },
      ]
    });
  alert.present();

}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}