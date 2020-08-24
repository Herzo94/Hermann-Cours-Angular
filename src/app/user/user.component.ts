import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `<router-outlet></router-outlet>`,
  //templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
 
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
