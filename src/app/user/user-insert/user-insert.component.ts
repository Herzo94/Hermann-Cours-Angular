import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, from } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.css']
})
export class UserInsertComponent implements OnInit {

  public userForm: FormGroup;
  message = '';
  result;

  constructor(private fb: FormBuilder, route: ActivatedRoute, private userService : UserService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  // This methods run when Angular destroy a component (cf component life cycle)
  /*ngOnDestroy(): void {
    this.reservationSubscription.unsubscribe() // We unsubscribe from the observable
  }*/

  async onInsertUser() { 
    this.result = await this.afAuth.createUserWithEmailAndPassword(this.userForm.value.email,this.userForm.value.password); //Création dans authentification
    //Création dans la base de donnée dans la table user
    //const result = await this.userService.createUser(this.userForm.value.email, this.userForm.value.password, this.userForm.value.type);
    
    if( this.result && this.result.user) {
      //console.log('userCreated', result);
      this.result = null;
    }

    
    this.userForm.reset();

    await Toast.show({ 
      text: 'Insertion effectué avec succès!'
    });

    this.router.navigate(['/user']);
  }

}
