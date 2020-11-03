import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
export class UserInsertComponent implements OnInit, OnDestroy {

  public userForm: FormGroup;
  message = '';
  result;
  user;
  dateCreation = new Date();
  personalSpace;
  sub;

  constructor(private fb: FormBuilder, route: ActivatedRoute, private userService : UserService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      type: ['', Validators.required],
      tel: ['', Validators.required],
    });

    /*
    async ngOnInit() {

    this.usersCollection = await this.userService.readUser();
    console.log("UsersCollection : ", this.usersCollection);
    this.sub = this.usersCollection.valueChanges({
      idField: 'id',
      
    }).subscribe((data) => {
      this.users = data as IUser[]; 
    })
   
  }*/

  /*
  this.sub = this.afAuth.authState.subscribe((user) => {
      console.log('user', user);

      this.user = user;
      if (this.user) {
         console.log(this.reservationService.readPersonalReservationByUID(user.uid));

        this.reservationService.readPersonalReservationByUID(user.uid).subscribe(
          (data) => {
            console.log('ngOnInt readPersonnalReservationById / data', data);
            this.reservation = data;
            console.log('mes reservations data : -> ', this.reservation);
           
            console.log('mes reservations$  OBSERVABLE : -> ', this.mesReservations$);
      
            if (!data || data.length === 0) {
              console.log(`Creating a new personal reservation for ${user.displayName}`);
              //this.reservationService.createPersonalReservation(this.uid, this.name, this.type);
              //lié l'élément ici à une collection par exemple
            }
          },
          (err) => {
            console.error('readPersonalSpaceById error', err);
          }
        );
      }
    });*/


    this.sub = this.afAuth.authState.subscribe((user) => { //etat actuel utilisateur connecté
      console.log('user', user);

      this.user = user;
      if (this.user) {
        // console.log(this.db.readPersonalSpaceByUID(user.uid));

        this.userService.readUserWithUID(user.uid).subscribe(
          (data) => {
            console.log('ngOnInt readPersonnalSpaceById / data', data);
            this.personalSpace = data;
            if (!data || data.length === 0) {
              console.log(`Creating a new space for ${user.displayName}`);
              this.userService.createUser(this.personalSpace);
              //this.userService.createAdminUser;
              //pas utile de laisser ce bout de code ici ?
            }
          },
          (err) => {
            console.error('readPersonalSpaceById error', err);
          }
        );
      }
    });
    
  }

  

  async onInsertUser() { //Création dans la base de donnée dans la table user
      
    this.result = await this.afAuth.createUserWithEmailAndPassword(this.userForm.value.email,this.userForm.value.password); //Création dans authentification
    
    /*const resultRes = await this.userService.createAdminUser(
      this.userForm.value.email,
      this.userForm.value.name,
      this.userForm.value.type,
      this.dateCreation, // Question données provisoire
      this.userForm.value.tel,
    );*/
     
   // console.log('resultRes : ', resultRes);
    console.log('this.userForm.value.email : ',  this.userForm.value.email);
    console.log('this.userForm.value.displayName : ',  this.userForm.value.displayName);
    console.log('this.userForm.value.type : ',  this.userForm.value.type);
    console.log('this.userForm.value.tel : ',  this.userForm.value.tel);
    
    if( this.result) {
      const userCreated = await this.userService.createAdminUser({ //spread operator.. 
       // ...this.result.user,
        email: this.userForm.value.email,
        displayName: this.userForm.value.displayName,
        type: this.userForm.value.type,
        tel: this.userForm.value.tel, 
      });

      console.log('this.result', this.result);
      console.log('user created', userCreated);
      this.result = null;
    }
    
    this.userForm.reset();

    await Toast.show({ 
      text: 'Insertion effectué avec succès!'
    });

    this.router.navigate(['/user']);
  }

  // This methods run when Angular destroy a component (cf component life cycle)
  ngOnDestroy() {
    this.sub.unsubscribe() // We unsubscribe from the observable
  }

}
