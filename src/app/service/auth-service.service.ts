import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;
  isAdmin = false;
 

  constructor(private afAuth: AngularFireAuth, public router : Router, userService : UserService) { }

 async signIn(email, password) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    if(result.user){
      this.isAuth = true;
    }
    else{
      this.isAuth = false;
    }
    return result;
    
  }

  async login(email, password){
    const user:any = await this.afAuth.signInWithEmailAndPassword(email, password); //dans le resultat, on met le await et sans oublier de mettre le async à côté de la fonction
    if (user){
   
      this.isAuth = true;
     
      if(email === 'admin@gmail.com'){ 
         this.isAdmin = true;
      }
 
      /*else if(user.type === 'isAdmin'){ 
         this.isAdmin = true;
         this.isSuperAdmin = false;
      }

      else if(user.type === 'isSuperAdmin'){ 
         this.isSuperAdmin = true;
         this.isAdmin = false;
      }*/
    } 

    else{
      this.isAuth = false;
      this.isAdmin = false;
    }
    return user;
  }

  signOut() {
    this.isAuth = false;
    this.router.navigate(['/login'])
  }
}
