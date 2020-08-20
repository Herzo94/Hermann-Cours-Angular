import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PersonalReservationService } from './../../service/personal-reservation.service'; //service
import { UserService } from '../../../app/service/user.service'; //service
import { IPersonalReservation } from '../../models/IPersonalReservation'; //model
import { AngularFireAuth } from '@angular/fire/auth';
import { IUserCustom } from './../../models/IUserCustom';
import { auth, User } from 'firebase';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-insert-personal-reservation',
  templateUrl: './insert-personal-reservation.component.html',
  styleUrls: ['./insert-personal-reservation.component.css']
})
export class InsertPersonalReservationComponent implements OnInit {
  reservationPersonalForm: FormGroup;
  result;//?:  User | auth.UserCredential ;
  user//;?: auth.UserCredential;
  message = '';

  constructor(private fb: FormBuilder, route: ActivatedRoute, private personalReservationService : PersonalReservationService, private router: Router, private afAuth: AngularFireAuth, private userService: UserService) { }

  ngOnInit(): void {
    this.reservationPersonalForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      employe: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required],
    });
  }

  async onInsertPersonalReservation() { 

    //try {
    this.message = '';
    const { name, type, employe, date, heure } = this.reservationPersonalForm.value;
    
    this.reservationPersonalForm.reset();  
    //console.log('this.result', this.result); // Question : erreur : this.result : undefined
    //console.log('this.result.user', this.result.user); // Question :  core.js:4197 ERROR Error: Uncaught (in promise): TypeError: Cannot read property 'user' of undefined
    //Question :  TypeError: Cannot read property 'user' of undefined

    if (this.result && this.result.user) {
    const { uid } = this.result.user;
    const newPersonnalReservation: IPersonalReservation = { 
      uid, name, type, employe, date, heure
     }  
   
        const reservationPersonalCreated = await this.personalReservationService.createPersonnalReservation(newPersonnalReservation);
        console.log('ReservationCreated', reservationPersonalCreated);
        this.result = undefined;   
    
    await Toast.show({ //si problème -> Stackoverflow 
      text: 'Insertion réservation personnel effectué avec succès!'
    });

    this.reservationPersonalForm.reset();
    this.router.navigate(['/personnal-reservation']);
  }

  //}
  /*catch (error) {
    console.error(error);      
    if(error.message === 'ERREUR') {
      this.message = 'ERREUR';
    }
  }*/

  }

}
