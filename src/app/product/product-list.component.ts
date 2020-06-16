import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
})

export class ProductListComponent implements OnInit {
  
  public searchTerm: string = ''
  public myBorderSize: number = 1
  public displayImage: boolean = true
  public products$: Observable<any[]>

  constructor(/*public productService: ProductService*/) {
    //this.products$ = productService.getProducts$()
  }

  ngOnInit(): void {
  }

  public toggleImage(): void {
   this.displayImage = !this.displayImage
  }

  /*public refreshProducts() {
    this.productService.fetch()
  }

  public deleteProduct(id: string) { // je passe l'id du produit depuis le template (html)
    //this.productService.fetch()
    console.log("Delete product : ", id);
    this.productService.deleteProduct(id); // je pass l'id au service
  }*/

}
