import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './../../service/product.service';
import { IProduct } from '../../models/IProduct';
import { AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
  private productsCollection: AngularFirestoreCollection<IProduct>;
  products$: Observable<IProduct[]>;
  products: IProduct[] = [];
  sub;

  public productSearch: string = '';
  public myBorderSize: number = 1;
  public displayImage: boolean = true;
  public searchTerm: string = '';
 
  
  constructor(private productService: ProductService) {
    //this.products$ = productService.getProducts$()
  }

  async ngOnInit() {
    console.log("CoucouResa");

    this.productsCollection = await this.productService.readProduct();
    console.log("ProductsCollection : ", this.productsCollection);
    this.sub = this.productsCollection.valueChanges({
      idField: 'id',
      
    }).subscribe(data => {
      this.products = data;
      console.log("product data", data);
    })
    
  }

  public toggleImage(): void {
   this.displayImage = !this.displayImage
  }

  updateProduct(product, id) {
    const ProductWithId = { ...product, id };
    console.log('ProducttWithId', ProductWithId);
    this.productService.updateProduct(ProductWithId);
  }

 
  public deleteProduct(id){
    console.log("Hello Delete Prod");
    this.productService.deleteProduct(id)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /*public refreshProducts() {
    this.productService.fetch()
  }*/

  /*public deleteProduct(id: string) { // je passe l'id du produit depuis le template (html)
    //this.productService.fetch()
    console.log("Delete product : ", id);
    this.productService.deleteProduct(id); // je pass l'id au service
  }*/
}
