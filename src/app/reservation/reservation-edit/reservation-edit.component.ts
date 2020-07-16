import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/service/reservation.service';
import { first } from 'rxjs/operators';
import { IReservation } from 'src/app/models/IReservation';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {

  public reservationForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private reservationService : ReservationService, private router: Router) {
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
          Validators.maxLength(40)
         ] // All the validators to run against this field
       ],

      /*price: [1, Validators.min(1)],
      starRating: [0, [Validators.min(0), Validators.max(5)]],*/
      
 }) 
   }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params.id;
    console.log('id : ', id);

    //Question pour Samir ci-dessous :  Pourquoi l'interface IReservation ne fonctionne pas donc j'ai mis any provisoirement -> Regardé la réponse dans l'email
    const resa: any = await this.reservationService.getByIdReservation(id).pipe(first())
    .toPromise().catch(err=>err) //chercher dans le service
    console.log(resa);
    resa.id = id;
    this.reservationForm.patchValue(resa); //met le contenu dans le formulaire
  }


  async onUpdateReservation() {
    console.log('this.suggestionForm.value', this.reservationForm.value);
    const result = await this.reservationService.updateReservation(this.reservationForm.value as any);
    console.log('result', result);
    this.reservationForm.reset();
    this.router.navigate(['/reservation']);
    console.log(this.reservationForm);
  }

}
