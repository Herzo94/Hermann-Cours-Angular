import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Plugins } from '@capacitor/core';
import { AngularFireAuth } from '@angular/fire/auth';
const { Toast } = Plugins;

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  userProfil: User;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((userProfil) => {
      this.userProfil = userProfil;
    });
  }

  //Ne pas oublier de mettre async de cette fonction
  /*await Toast.show({ //si problème -> Stackoverflow 
    text: 'Enregistrement du compte effectué avec succès!'
  });*/
}
