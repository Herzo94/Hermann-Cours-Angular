import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './../../service/product.service';
import { IProduct } from '../../models/IProduct';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/auth-service.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/modal/modal.component';
import { ProductInsertComponent } from '../product-insert/product-insert.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;


@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
})

export class ProductListComponent implements OnInit, OnDestroy {
  private productsCollection: AngularFirestoreCollection<IProduct>;
  products$: Observable<IProduct[]>
  products: IProduct[] = [];
  sub;
  public searchTerm: string = '';

  public productSearch: string = '';
  public myBorderSize: number = 1;
  public displayImage: boolean = true;

  constructor(private productService: ProductService, public authService : AuthService, public modalController: ModalController) { }

  async ngOnInit() {

    this.productsCollection = await this.productService.readProduct();
    console.log("ProductsCollection : ", this.productsCollection);
    this.sub = this.productsCollection.valueChanges({
      idField: 'id',
      
    }).subscribe(data => {
      this.products = data;
    })
    
  }

  public async insertProduct(){
  
      const modal = await this.modalController.create({
        component: ProductInsertComponent,
        cssClass: 'my-custom-class',
      });
      return await modal.present();  
  }

  public async modifProduct(id){
    //this.router.navigate([`reservation/${id}/edit`])
  
      const modal = await this.modalController.create({
        component: ProductEditComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          data: this.products.find( element => element.id === id )
        }
      });
      return await modal.present();  
  } 

  async deleteProduct(id){
    this.productService.deleteProduct(id)

    await Toast.show({ 
      text: 'Suppression effectuée avec succès!'
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
