import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../service/auth-service.service';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  userProfil: User;
  mobileQuery: MediaQueryList; //mobileQuery c'est un lister qui est capable d'écouter la taille qu'a ma page, reconnaitre les dimensions de l'interface graphique

  fillerNav=[
    {name:"Catalogue des produits", route:"product", icon:"cart-outline"},
    {name:"Utilisateurs", route:"user", icon:"people-outline"},
    {name:"Reservations", route:"reservations", icon:"calendar-outline"},
    {name:"Mes reservations", route:"resa", icon:"man-outline"},
    {name:"Profil", route:"profil", icon:"person-outline"},
  ]

  /*fillerContent = Array(50).fill(0).map(() => 
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco`);
  */ 

  //isAuth = false;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public authService : AuthService, private menu: MenuController, private afAuth: AngularFireAuth) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges(); //listener qui déctect les changements
    this.mobileQuery.addListener(this._mobileQueryListener);
    //this.isAuth = this.authService.isAuth;
    //console.log('Sidenav is auth:', this.isAuth );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener); //on s'abonne et on supprime le listener, dans le but de ne plus l'écouter
  }

  shouldRun = true;

  ngOnInit(): void {
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
