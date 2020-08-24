import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../service/auth-service.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList; //mobileQuery c'est un lister qui est capable d'écouter la taille qu'a ma page, reconnaitre les dimensions de l'interface graphique

  fillerNav=[
    //{name:"Dashboard", route:"dashboard", icon:"keypad-outline"},
    //{name:"Prestations", route:"prestation", icon:"home-outline"},
    {name:"Reservations", route:"reservation", icon:"calendar-outline"},
    {name:"Mes reservations", route:"reservations_personnal", icon:"man-outline"},
    {name:"Utilisateurs", route:"user", icon:"people-outline"},
    //{name:"Commandes", route:"commande", icon:"book-outline"},
    {name:"Catalogue des produits", route:"product", icon:"cart-outline"},
    {name:"Profil", route:"profil", icon:"person-outline"},
    //{name:"Contact", route:"contact", icon:"mail-outline"}
  ]

  /*fillerContent = Array(50).fill(0).map(() => 
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco`);
  */ 

  isAuth = false;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public authService : AuthService, private menu: MenuController) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges(); //listener qui déctect les changements
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.isAuth = this.authService.isAuth;
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
