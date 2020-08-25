import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  result;
  user;
  message;
  userProfil: User;
  authStatus: boolean;
  isAuth: boolean;
  isAdmin: boolean;

  constructor(private authService: AuthService, private fb: FormBuilder, private afAuth: AngularFireAuth, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
        email: ['', Validators.email],
        password: ['',[Validators.required, Validators.minLength(6)]]
      });
  
      this.loginForm = this.fb.group({
        email: ['', Validators.email],
        password: ['',[Validators.required, Validators.minLength(6)]]
      });
  
      this.afAuth.authState.subscribe((userProfil) => {
        this.userProfil = userProfil;
      });  
  }

  async login() {
    if (!this.loginForm.valid) {
      return;
    }
    
    this.message = '';


    console.log('Admin ?');
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
    
      
   // console.log('us', user);
    //this.user = user;
    
    /*if (this.user){ //Question : Gérer ici si c'est un admin ?
        //this.router.navigate(['product']);  
        
        if(this.user.email === 'admin@gmail.com'){
          this.router.navigate(['reservations']); 
        }

        else{
          this.router.navigate(['product']); 
        }
      }*/

    try {
      this.message = '';
      console.log('login', this.loginForm.value);

      //const { email, password} = this.loginForm.value;
      //this.user = await this.authService.login(email, password); //appel à la méthode

      /*if(this.user.email === 'admin@gmail.com'){
        console.log('Admin ? ou pas ???????? - this.user.email', this.user.email);
      }*/

      if (this.user){ //Question : Gérer ici si c'est un admin ?
        //this.router.navigate(['product']);  
        /*if(this.user.email === 'admin@gmail.com'){ //PAS UTILE
          this.router.navigate(['reservations']); 
        }*/
        /*else{
          this.router.navigate(['product']); 
        }*/

        this.router.navigate(['product']); 

      }
     
    } catch (error) {
      this.message = error.message;
    }
  }

  /*onActif(){
    this.isAuth = true;
  }*/
  onSignOut() {
    this.isAuth = false;
  }

}
