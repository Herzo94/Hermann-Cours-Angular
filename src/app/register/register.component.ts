import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { AuthGuardService } from '../service/auth-guard.service';
import { AuthService } from './../service/auth-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './../service/user.service';
import { Router } from '@angular/router';
import { auth, User } from 'firebase';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  result;
  user;
  message;
  userProfil: User;
  authStatus: boolean;
  isAuth: boolean;

  constructor(private authService: AuthService/*authGuardService: AuthGuardService*/, private fb: FormBuilder, private afAuth: AngularFireAuth, private userService: UserService, private router: Router) { }

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

    //this.authStatus = this.authGuardService.isAuth;
}

async register() {
  if (!this.registerForm.valid) {
    return;
  } 
  //this.result = await this.afAuth.createUserWithEmailAndPassword(this.registerForm.value.email,this.registerForm.value.password);
  this.result = await this.authService.signIn(this.registerForm.value.email,this.registerForm.value.password);

  await Toast.show({ //si problème -> Stackoverflow 
    text: 'Enregistrement du compte effectué avec succès!'
  });

  this.registerForm.reset();
  if( this.result && this.result.user) {
    const userCreated = await this.userService.createUser(this.result.user);
    console.log('userCreated', userCreated);
    this.result = null;
  }
}

onActif(){
  this.isAuth = true;
}
onSignOut() {
  this.isAuth = false;
}

}
