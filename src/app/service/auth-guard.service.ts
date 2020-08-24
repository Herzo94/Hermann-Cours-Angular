import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  //isAuth = false;

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              this.router.navigate(['/resa']);
              //this.isAuth = true;
              resolve(true);
              
             
            } else {
              this.router.navigate(['/register']);
              //this.isAuth = false;
              resolve(false);
            }
          }
        );
      }
    );
}
// a enlever
/*signOut() {
  this.isAuth = false;
}*/

}