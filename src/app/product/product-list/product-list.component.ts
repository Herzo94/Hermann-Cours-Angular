import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './../../service/product.service';
import { IProduct } from '../../models/IProduct';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/auth-service.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/modal/modal.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { DbService } from '../../service/db.service';
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

  user;
  photo = { file: '', title: '' };
  photoServerURL;
  uploadedImgURL = '';
  personalSpace;

  constructor(private productService: ProductService, public authService : AuthService, public modalController: ModalController, private afStorage: AngularFireStorage, private db: DbService) { }

  async ngOnInit() {

    this.productsCollection = await this.productService.readProduct();
    console.log("ProductsCollection : ", this.productsCollection);
    this.sub = this.productsCollection.valueChanges({
      idField: 'id',
      
    }).subscribe(data => {
      this.products = data;
    })
    
  }

  onFileChange(e) {
    console.log(e.target.files[0]);
    this.photo.file = e.target.files[0];
  }

  postPhoto() {
    console.log(this.photo);
    const uid = this.user.uid;
    const photoPathOnServer = `image-producs/${uid}/${this.photo.title}`;
    const photoRef = this.afStorage.ref(photoPathOnServer);
    this.photoServerURL = '';

    console.log('photoPathOnServer', photoPathOnServer);
    console.log('uid', uid);
    console.log('this.photo.file', this.photo.file);
    console.log('this.photo.title', this.photo.title);

    const currentUpload = this.afStorage.upload(
      photoPathOnServer,
      this.photo.file
    );

    currentUpload.catch((err) => console.error(err));

    currentUpload
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.photoServerURL = photoRef.getDownloadURL();
          this.photoServerURL.subscribe((data) => {
            console.log('data >>> ', data);
            this.uploadedImgURL = data;
            this.db.updatePersonalSpacePhotoURLs(
              this.user,
              this.uploadedImgURL
            );
          });
        })
      )
      .subscribe();

    // clear form
    this.photo = { file: '', title: '' };
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
