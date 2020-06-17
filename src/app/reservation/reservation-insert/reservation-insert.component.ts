import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, from } from 'rxjs';
import { Router } from '@angular/router';
import { ReservationService } from './../../service/reservation.service';

@Component({
  selector: 'app-reservation-insert',
  templateUrl: './reservation-insert.component.html',
  styleUrls: ['./reservation-insert.component.css']
})
export class ReservationInsertComponent implements OnInit {

  ;
  public reservationForm: FormGroup;
  private reservationSubscription: Subscription;
  message = '';

  constructor(private fb: FormBuilder, route: ActivatedRoute, private reservationService : ReservationService, private router: Router) {
    this.reservationForm = fb.group({
      id: [null], // It is the same as `id: new FormControl(null)`
      name: [
        '', // default value
        [
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(80)
         ] // All the validators to run against this field
       ],
    
      type: [''],
      employe: [''],
      date: [''],
      heure: [''],

      /*price: [1, Validators.min(1)],
      starRating: [0, [Validators.min(0), Validators.max(5)]],*/
      
 }) 
   }

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      employe: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required],
    });
  }

  // This methods run when Angular destroy a component (cf component life cycle)
  ngOnDestroy(): void {
    this.reservationSubscription.unsubscribe() // We unsubscribe from the observable
  }

  async onInsertReservation() {
    console.log('this.suggestionForm.value', this.reservationForm.value);
    const result = await this.reservationService.createReservation(
      this.reservationForm.value.name,
      this.reservationForm.value.type,
      this.reservationForm.value.employe,
      this.reservationForm.value.date,
      this.reservationForm.value.heure
    );
    console.log('result', result);
    if ((result as any).jT) {
      this.message = `Réservation créé avec l'id ${(result as any).id}`;
    }
    this.reservationForm.reset();
    this.router.navigate(['/reservation']); //Question problème de retour à la page list après insertion
  }

}
