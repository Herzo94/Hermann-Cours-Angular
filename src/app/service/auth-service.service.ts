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
    if (user){ //Si l'utilisateur existe
   
      this.isAuth = true;
     
      console.log('this.isAuth : ', this.isAuth )
      
      if(email === 'admin@gmail.com'){ 
        this.isAdmin = true;
        console.log('email ADMIN : ', email)
        console.log('STATE ADMIN : ', this.isAdmin)
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
      console.log('ok pas de user donc go else ')
      this.isAuth = false;
      this.isAdmin = false;
      console.log('isAuth et isAdmin : ',this.isAuth, this.isAdmin);  
    }
    return user;
  }

  signOut() {
    this.isAuth = false;
    this.isAdmin = false;
    console.log('SignOut :', this.isAuth)
    console.log('SignOut + isAdmin :', this.isAdmin)
    this.router.navigate(['/login'])
  }
}
