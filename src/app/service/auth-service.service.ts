import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import * as firebase from 'firebase';
import { auth, User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;
  isAdmin = false;
  userProfil: User;
 

  constructor(private afAuth: AngularFireAuth, public router : Router, userService : UserService) { }

  /*ngOnInit() : void{ //Question Pas utile de mettre ce bout de code ici ?
     this.afAuth.authState.subscribe((data) => { //récupère la valeur du user s'il est co / IL RENTRE PAS DANS CETTE CONDITION DONC PAS CO
    this.userProfil = data;
    console.log(' Auth-Service : HALLOOOOO User profil auth service -> : ', this.userProfil);
    });  
  }*/

 async checkAuth(){
   const user = await this.afAuth.currentUser;
   console.log('checkAuth - currentUser : ' + user)
   if (user) {
     this.isAuth = true;
   } else {
     this.isAuth = false;
   }
  return user;
  }

 async signIn(email, password) {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    if(result.user){ // Questions : Ces lignes commentées ne sont pas très utiles non ? pas utile 
      this.isAuth = true; //pas utile le "this.isAuth=true" sachant que c'est juste pour un enregistrement 
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
    console.log('this.isAuth : ', this.isAuth ) //Question : problème ici peut-être ? est-ce util de mettre le resultat à true apres la condition de si un user existe ? 
    
    //console.log('User en question', this.user.type)

        if(email === 'admin@gmail.com'){ //Gérer ici la condition de si c'est un admin ou un super admin
        //if(user.type === 'admin' || === 'superAdmin' || email === 'admin@gmail.com' ){ //Gérer ici la condition de si c'est un admin ou un super admin
        
          this.isAdmin = true;
          console.log('email ADMIN : ', email)
          console.log('STATE ADMIN : ', this.isAdmin)
          //this.router.navigate(['/reservations']) //pas faire ici la redirection
        }

        else if(email){ 
          this.isAuth = true;
          console.log('email userNormal : ', email)
          console.log('STATE ADMIN -> : ', this.isAdmin)
         // this.router.navigate(['/personalreservation']) //pas faire ici la redirection
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

 async signOut() {
    await firebase.auth().signOut();
    this.isAuth = false;
    this.isAdmin = false;
    console.log('firebase.auth().signOut()' + firebase.auth().signOut())
    console.log('SignOut - this.isAuth :', this.isAuth)
    console.log('SignOut + isAdmin :', this.isAdmin)
    this.router.navigate(['/login'])
    
  }
}
