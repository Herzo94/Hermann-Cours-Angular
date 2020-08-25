import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;
  isAdmin = false;
 

  constructor(private afAuth: AngularFireAuth, public router : Router, userService : UserService) { }

 /*async checkAuth(){
   const user = await this.afAuth.currentUser;
   if (user) {
     this.isAuth = true;
   } else {
     this.isAuth = false;
   }
  return user;
  }*/

 async signIn(email, password) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    if(result.user){ // Questions : Ces lignes commentées ne sont pas très utiles non ? pas utile 
      this.isAuth = true;
    } //pas utile le this.isAuth sachant que c'est juste pour un enregistrement 
    else{
      this.isAuth = false;
    }
    return result; 
  }

  async login(email, password){ 
    const user:any = await this.afAuth.signInWithEmailAndPassword(email, password); //dans le resultat, on met le await et sans oublier de mettre le async à côté de la fonction
    
    if (user){ //Si l'utilisateur existe
    console.log('this.isAuth : ', this.isAuth )
    this.isAuth = true;

        if(email === 'admin@gmail.com'){ 
          //if(this.isAdmin===admin || superAdmin){  //pas top c'est mieux -> if(this.isAdmin || superAdmin) // genre si c'est égal true
          this.isAdmin = true;
          console.log('email ADMIN : ', email)
          console.log('STATE ADMIN : ', this.isAdmin)
          //this.router.navigate(['/reservation'])
          }

        else{
          console.log('ok pas de user donc go else ')
          this.isAuth = false;
          this.isAdmin = false;
          console.log('isAuth et isAdmin : ',this.isAuth, this.isAdmin);  
          console.log('email ADMIN : ', email)
          console.log('STATE ADMIN : ', this.isAdmin)
        }
        return user;
      }
   
    //console.log('this.isAuth : ', this.isAuth )
    //firebase.auth().signInWithEmailAndPassword(email, password)
    //this.afAuth.signInWithEmailAndPassword(email, password)
    /*.then(r => {
      console.log('r', r);
      
    })
    .catch(err => {
      console.log(err);
      
    });*/

}

  signOut() {
    this.isAuth = false;
    this.isAdmin = false;
    console.log('SignOut :', this.isAuth)
    console.log('SignOut + isAdmin :', this.isAdmin)
    this.router.navigate(['/login'])
    
  }
}
