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

  mobileQuery: MediaQueryList;

  fillerNav=[
    {name:"Dashboard", route:"dashboard", icon:"keypad-outline"},
    {name:"Prestations", route:"prestation", icon:"home-outline"},
    {name:"Reservations", route:"reservation", icon:"book"},
    {name:"Commandes", route:"commande", icon:"book-outline"},
    {name:"Products", route:"product", icon:"category"},
    {name:"Profil", route:"profil", icon:"person-outline"},
    {name:"Contact", route:"contact", icon:"mail-outline"}
  ]

  fillerContent = Array(50).fill(0).map(() => 
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco`);

  isAuth = false;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public authService : AuthService, private menu: MenuController) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.isAuth = this.authService.isAuth;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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
