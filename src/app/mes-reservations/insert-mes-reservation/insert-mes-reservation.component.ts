import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ReservationService } from './../../service/reservation.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-reservation-insert',
  templateUrl: './insert-mes-reservation.component.html',
  styleUrls: ['./insert-mes-reservation.component.css']
})
export class InsertMesReservationComponent implements OnInit, OnDestroy {

  public reservationForm: FormGroup;
  message = '';
  user;
  result;
  personalSpace;
  sub;

  constructor(private fb: FormBuilder, route: ActivatedRoute, private reservationService : ReservationService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      employe: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required],
    });

    this.sub = this.afAuth.authState.subscribe((user) => { //etat actuel utilisateur connecté
      console.log('user', user);

      this.user = user;
      if (this.user) {
        this.reservationService.readPersonalReservationByUID(user.uid).subscribe(
          (data) => {
            console.log('ngOnInt readPersonnalSpaceById / data', data);
            this.personalSpace = data;
            if (!data || data.length === 0) {
              console.log(`Creating a new space for ${user.displayName}`);
              this.reservationService.createReservationWithUID(this.personalSpace);
            }
          },
          (err) => {
            console.error('readPersonalSpaceById error', err);
          }
        );
      }
    });
  }

  async onInsertReservation() { 
    const result = await this.reservationService.createReservation(
      this.reservationForm.value.name,
      this.reservationForm.value.type,
      this.reservationForm.value.employe,
      this.reservationForm.value.date,
      this.reservationForm.value.heure,
      this.user.uid
      
    );

    console.log('result', result);
    
    await Toast.show({ 
      text: 'Insertion effectué avec succès!'
    });

    this.reservationForm.reset();
    this.router.navigate(['/personalreservation']);
  }

   // This methods run when Angular destroy a component (cf component life cycle)
  ngOnDestroy(): void {
    this.sub.unsubscribe() // We unsubscribe from the observable
  }

}
