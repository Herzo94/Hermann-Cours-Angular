import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HoraireDispoInsertReservationComponent } from './horaire-dispo-insert-reservation/horaire-dispo-insert-reservation.component'

@Component({
  selector: 'app-horaire-dispo-reservation',
  templateUrl: './horaire-dispo-reservation.component.html',
  styleUrls: ['./horaire-dispo-reservation.component.css']
})
export class HoraireDispoReservationComponent implements OnInit {

  constructor( public modalController: ModalController) { }

  ngOnInit(): void {
  }

  public async insertHoraireReservation(){
    console.log('Click button horaire reservation');
  
    const modal = await this.modalController.create({
      component: HoraireDispoInsertReservationComponent,
      cssClass: 'my-custom-class',
    });
    return await modal.present(); 
    
}

}
