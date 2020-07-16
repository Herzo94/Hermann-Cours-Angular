import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;

  constructor(private afAuth: AngularFireAuth, public router : Router) { }

 async signIn(email, password) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    if(result.user){
      this.isAuth = true;
    }
    else{
      this.isAuth = false;
    }
    return result;
    /*return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            console.log(" valeur is Auth : ",this.isAuth);
            resolve(true);
          }, 2000
        );
      }
    );*/

  }

  signOut() {
    this.isAuth = false;
    console.log("sign out");
    this.router.navigate(['/register'])
  }

  async login(email, password){
    const user = await this.afAuth.signInWithEmailAndPassword(email, password); //dans le resultat, on met le await et sans oublier de mettre le async à côté de la fonction
    if (user){
      this.isAuth = true;
    } 
    else{
      this.isAuth = false;
    }
    return user;
  }
}
