import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  template: `<ion-router-outlet></ion-router-outlet>`,
  //templateUrl: './product.component.ts',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
