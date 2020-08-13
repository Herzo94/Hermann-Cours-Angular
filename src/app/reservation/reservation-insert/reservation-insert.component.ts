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

  
  public reservationForm: FormGroup;
  //private reservationSubscription: Subscription;
  message = '';

  constructor(private fb: FormBuilder, route: ActivatedRoute, private reservationService : ReservationService, private router: Router) {
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
        [
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(25)
         ] // All the validators to run against this field
       ],

      employe: [
        '', // default value
        [
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(20)
         ] // All the validators to run against this field
       ],

      date: [
        '', // default value
        [
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(15)
         ] // All the validators to run against this field
       ],

      heure: [
        '', // default value
        [
          Validators.required, 
          Validators.minLength(3), 
          Validators.maxLength(6)
         ] // All the validators to run against this field
       ],

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
  /*ngOnDestroy(): void {
    this.reservationSubscription.unsubscribe() // We unsubscribe from the observable
  }*/

  async onInsertReservation() { //remplace le .then
    const result = await this.reservationService.createReservation(
      this.reservationForm.value.name,
      this.reservationForm.value.type,
      this.reservationForm.value.employe,
      this.reservationForm.value.date,
      this.reservationForm.value.heure
    );
    console.log('result', result);

    this.reservationForm.reset();
    this.router.navigate(['/reservation']);
  }

}
