import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AuthService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  isAuth = false;

  constructor(private router: Router, private auth: AuthService) { }
 //Laisse que passer sur les pages qui ne sont pas login
  async canActivate():  Promise<boolean>  {
    await this.auth.checkAuth();
    
    (this.auth.isAuth)//si authentifié
    //this.auth.checkAuth()
    ? this.auth.isAuth = true //null //QUESTION PROBLEME ICI
    : //sinon
    this.router.navigate(['/login']);
    console.log(this.auth.isAuth);
    console.log('this.auth.isAuth : ' + this.auth.isAuth);
    
    if (this.auth.isAuth)//si authentifié
    {
      console.log('Hallo -> this.auth.isAuth : '+ this.auth.isAuth)
    }
    else{
      console.log('Hallo ELSE -> this.auth.isAuth : '+ this.auth.isAuth)
    }

    if (this.auth.checkAuth())//si authentifié
    {
      console.log('Hallo -> this.auth.checkAuth() : '+ this.auth.checkAuth())
      
    }
    else{
      console.log('Hallo ELSE -> this.auth.checkAuth() : '+ this.auth.checkAuth())
    }

    return this.auth.isAuth;




     /*return new Promise(
       (resolve, reject) => {
         firebase.auth().onAuthStateChanged(
           (user) => {
             if(user) {
               console.log('coucou user' + user)
               //this.router.navigate(['/reservations']);
               this.isAuth = true;
               resolve(true);
              
             
             } else {
               this.router.navigate(['/register']);
               //this.isAuth = false;
               console.log('pas connecté')
               resolve(false);
               //this.router.navigate(['/login']);
             }
           }
         );
       }
     );*/
}
// a enlever ?
async signOut() {
  this.auth.isAuth = false;
}

//Un guard qui laisse passser et ..
}