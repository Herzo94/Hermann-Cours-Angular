import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './../../service/product.service';
import { IProduct } from '../../models/IProduct';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/auth-service.service';


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
 
  
  constructor(private productService: ProductService, public authService : AuthService) {
    //this.products$ = productService.getProducts$()
  }

  async ngOnInit() {

    this.productsCollection = await this.productService.readProduct();
    console.log("ProductsCollection : ", this.productsCollection);
    this.sub = this.productsCollection.valueChanges({
      idField: 'id',
      
    }).subscribe(data => {
      this.products = data;
    })
    
  }

  public toggleImage(): void {
   this.displayImage = !this.displayImage
  }

  updateProduct(product, id) {
    const ProductWithId = { ...product, id };
    this.productService.updateProduct(ProductWithId);
  }
 
  public deleteProduct(id){
    this.productService.deleteProduct(id)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /*public refreshProducts() {
    this.productService.fetch()
  }*/
}
