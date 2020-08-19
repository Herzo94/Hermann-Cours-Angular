import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ReservationService } from './../../service/reservation.service';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-reservation-insert',
  templateUrl: './reservation-insert.component.html',
  styleUrls: ['./reservation-insert.component.css']
})
export class ReservationInsertComponent implements OnInit {

  public reservationForm: FormGroup;
  message = '';
  user;
  result;

  constructor(private fb: FormBuilder, route: ActivatedRoute, private reservationService : ReservationService, private router: Router) { }

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      employe: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required],
    });
  }

  async onInsertReservation() { //remplace le .then
    const result = await this.reservationService.createReservation(
      this.reservationForm.value.name,
      this.reservationForm.value.type,
      this.reservationForm.value.employe,
      this.reservationForm.value.date,
      this.reservationForm.value.heure
      //Insérer ici l'id de l'utilisateur qui a réalisé une réservation

      /*if( this.result && this.result.user) {
        const userCreated = await this.userService.createUser(this.result.user);
        console.log('userCreated', userCreated);
        this.result = null;
      }*/
    );
    
    await Toast.show({ //si problème -> Stackoverflow 
      text: 'Insertion effectué avec succès!'
    });

    this.reservationForm.reset();
    this.router.navigate(['/reservation']);
  }

   // This methods run when Angular destroy a component (cf component life cycle)
  /*ngOnDestroy(): void {
    this.reservationSubscription.unsubscribe() // We unsubscribe from the observable
  }*/

}
