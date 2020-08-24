import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../service/auth-service.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './../service/user.service';
import { Router } from '@angular/router';

import { auth, User } from 'firebase';

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
    try {
      this.message = '';
      console.log('login', this.loginForm.value);

      const { email, password} = this.loginForm.value;
      this.user = await this.authService.login(email, password); //appel à la méthode
      if (this.user){
        //this.router.navigate(['dashboard']);  
        this.router.navigate(['reservation']);  
      }
    } catch (error) {
      this.message = error.message;
    }
  }
  onActif(){
    this.isAuth = true;
  }
  onSignOut() {
    this.isAuth = false;
  }

}
