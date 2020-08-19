import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/service/reservation.service';
import { first } from 'rxjs/operators';
import { IReservation } from 'src/app/models/IReservation';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../modal/modal.component';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
})
export class ReservationEditComponent implements OnInit {

  @Input() data: IReservation;  
  public reservationForm: FormGroup;
  message = '';
  

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private reservationService : ReservationService, private router: Router, public modalController: ModalController) {
    this.reservationForm = fb.group({
      id: [null], // It is the same as `id: new FormControl(null)`
      name: [
        '', // default value
        [
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(30)
         ] // All the validators to run against this field
       ],
    
      type: [
        '', // default value
        /*[
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(25)
         ] */ //All the validators to run against this field
       ],

      employe: [
        '', // default value
        /*[
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(20)
         ]*/ // All the validators to run against this field
       ],

      date: [
        '', // default value
        /*[
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(15)
         ]*/ // All the validators to run against this field
       ],

      heure: [
        '', // default value
        /*[
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(40)
         ]*/ // All the validators to run against this field
       ],
      
 }) 
   }

   async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async ngOnInit(): Promise<void> {
    this.reservationForm.patchValue(this.data); //met le contenu dans le formulaire
  }

  async onUpdateReservation() {
    console.log('this.suggestionForm.value', this.reservationForm.value);
    const result = await this.reservationService.updateReservation(this.reservationForm.value as any);
    this.modalController.dismiss();

    await Toast.show({ 
      text: 'Mise à jour effectué avec succès!'
    });
  }
  
}
