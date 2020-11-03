import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../service/auth-service.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './../service/user.service';
import { Router } from '@angular/router';

import { auth, User } from 'firebase';

import * as firebase from 'firebase';
//import { resolve } from 'path';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  loginForm: FormGroup;
  result;
  user;
  message;
  //userProfil: User;
  userProfil;
  authStatus: boolean;
  isAuth: boolean;
  isAdmin: boolean;
  sub;

  constructor(private authService: AuthService, private fb: FormBuilder, private afAuth: AngularFireAuth, private userService: UserService, private router: Router) { }

  ngOnInit() : void { //:void je dois laisser ou pas ?
      this.loginForm = this.fb.group({
        email: ['', Validators.email],
        password: ['',[Validators.required, Validators.minLength(6)]]
      });
  
   this.sub = this.afAuth.authState.subscribe((data) => { //récupère la valeur du user s'il est co / IL RENTRE PAS DANS CETTE CONDITION DONC PAS CO
   this.userProfil = data;
   console.log('HALLOOOOO User profil auth service -> : ', this.userProfil);
   });  

    /*this.sub = this.afAuth.authState.subscribe((userProfil) => {
        this.userProfil = userProfil;
      }); */

      /*this.sub = firebase.auth().onAuthStateChanged( //currentUSer ?
        (user) => {
          if(user){
            this.isAuth = true; //connecté
          }
          else{
            this.isAuth = false; //pas connecté
          }
          
        }
      )*/
  }

  async login() {
    if (!this.loginForm.valid) {
      return;
    }
    
    this.message = '';
    this.message = '';
    console.log('login', this.loginForm.value);

    const { email, password} = this.loginForm.value;
    this.user = await this.authService.login(email, password); //appel à la méthode
    //console.log('firebase.auth().signInWithEmailAndPassword(email, password):', firebase.auth().signInWithEmailAndPassword(email, password))
    //const user = await this.authService.login(email, password).catch(err => err); //appel à la méthode
    /*return new Promise (
      (resolve, reject) =>{
        const user = firebase.auth().signInWithEmailAndPassword(email, password).then(
          
      ()  => {
          resolve();
      },
      (error) => {
        reject(error);
      }
    )
      }
    )*/
    
    try {
      this.message = '';
      console.log('login', this.loginForm.value);

<<<<<<< HEAD
      const { email, password} = this.loginForm.value;
      //this.user = await this.authService.login(email, password); //appel à la méthode
      //if (this.user){
        //this.router.navigate(['product']);  
        this.router.navigate(['reservations']);  
      //}

      //if (this.isAdmin){
        console.log('CoucouAdmin');
      //}
=======
      if (this.user){ //Question : Gérer ici si c'est un admin ?
      console.log('this.loginForm.value ' + this.loginForm.value )
        if(this.user.email === 'admin@gmail.com'){ // si admin // Question : ne rentre pas dans cette condition
          this.router.navigate(['reservations']); 
        }
        else{ //si pas admin
          this.router.navigate(['personalreservation']); //provisoire 
        }

      }
     
>>>>>>> 8b7dc2bb63926a9751b4700f4d537414b8279677
    } catch (error) {
      this.message = error.message;
    }
  }

  onSignOut() {
    this.isAuth = false;
    this.authService.signOut;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
