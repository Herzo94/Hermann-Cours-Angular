import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AuthService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  //isAuth = false;

  constructor(private router: Router, private auth: AuthService) { }
 //Laisse que passer sur les pages qui ne sont pas login
  async canActivate():  Promise<boolean>  {
    /*await this.auth.checkAuth();
    
    (this.auth.isAuth)
    ? null
    : this.router.navigate(['/login']);
    console.log(this.auth.isAuth);*/
    return this.auth.isAuth;
//     return new Promise(
//       (resolve, reject) => {
//         firebase.auth().onAuthStateChanged(
//           (user) => {
//             if(user) {
//               //this.router.navigate(['/reservations']);
//               //this.isAuth = true;
//               resolve(true);
              
             
//             } else {
//               this.router.navigate(['/register']);
//               //this.isAuth = false;
//               resolve(false);
//             }
//           }
//         );
//       }
//     );
}
// a enlever
/*signOut() {
  this.isAuth = false;
}*/

//Un guard qui laisse passser et ..
}