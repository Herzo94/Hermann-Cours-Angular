import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-child',
  template: `
    <p>
      product-child works!
    </p>
  `,
  styles: [
  ]
})
export class ProductChildComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
