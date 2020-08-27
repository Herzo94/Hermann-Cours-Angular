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
  type: 'Normal';
  createdAt;
  

  constructor(private authService: AuthService/*authGuardService: AuthGuardService*/, private fb: FormBuilder, private afAuth: AngularFireAuth, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  this.registerForm = this.fb.group({
      email: ['', Validators.email],
      displayName: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(6)]],
      tel: ['', Validators.required],
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
  this.result = await this.afAuth.createUserWithEmailAndPassword(this.registerForm.value.email,this.registerForm.value.password);
  
  if(this.result) {
    this.createdAt = new Date();
    const userCreated = await this.userService.createUser({ //spread operator.. 
      ...this.result.user,
      displayName: this.registerForm.value.displayName,
      tel: this.registerForm.value.tel, 
    });
    //this.userService.createProductWithUID(this.user);
    console.log('userCreated', userCreated);
    this.result = null;
  }
  this.registerForm.reset();

  await Toast.show({ //si problème -> Stackoverflow 
    text: 'Enregistrement du compte effectué avec succès!'
  });
}

onSignOut() {
  this.isAuth = false;
}

}
