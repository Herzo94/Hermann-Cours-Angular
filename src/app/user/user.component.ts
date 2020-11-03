import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `<ion-router-outlet></ion-router-outlet>`,
  //templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
 
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
