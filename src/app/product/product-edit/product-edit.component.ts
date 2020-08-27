import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../modal/modal.component';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from '../../service/product.service';
import { Plugins } from '@capacitor/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
const { Toast } = Plugins;


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  
})
export class ProductEditComponent implements OnInit {

  @Input() data: IProduct;  
  public productForm: FormGroup
  message = '';
  imageUrl;
  user;
  photo = { file: '', title: ''};
  photoServerURL;
  uploadedImgURL = '';
  personalSpace;
  sub;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private productService: ProductService, private router: Router, public modalController: ModalController, private afAuth: AngularFireAuth, private afStorage: AngularFireStorage) {
    // We create our Form for product 
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async ngOnInit(): Promise<void> {

    this.productForm = this.fb.group({
      id: [null], // It is the same as `id: new FormControl(null)`
      productName: [''],
      description: [''],
      price: [0, Validators.min(0)],
      imageUrl: ['']
    })  
    this.productForm.patchValue(this.data); //met le contenu dans le formulaire
    console.log('Contenu formulaire : ',this.data )
    this.sub = this.afAuth.authState.subscribe((user) => {
      console.log('user : ' + user.displayName);
      this.user = user;
    })
  }

  onFileChange(e) {
    console.log(e.target.files[0]);
    this.photo.file = e.target.files[0];
  }

  async onUpdateProduct() { //ici ok mais sans le traitement deimage
    console.log('photo: ',this.photo);
    const uid = this.user.uid;
    console.log('uid : ',this.user.uid);
    console.log('this.productForm.value', this.productForm.value);      
    const result = await this.productService.updateProduct(this.productForm.value as any);
    this.modalController.dismiss();
  
      await Toast.show({ 
        text: 'Mise à jour effectué avec succès!'
      });
    }

    
    /*async onUpdateProduct() {
    console.log('photo: ',this.photo);
    console.log('uid: ',this.user.uid);
    const uid = this.user.uid;
    
    //const photoPathOnServer = `image-products/${uid}/${this.photo.title}`; //Pas utile d'enregistrer avec un id
    const photoPathOnServer = `image-products/${this.photo.title}`; 
    const photoRef = this.afStorage.ref(photoPathOnServer);
    this.photoServerURL = '';

    console.log('photoPathOnServer', photoPathOnServer);
    console.log('this.photo.file', this.photo.file);
    console.log('this.photo.title', this.photo.title);

    const currentUpload = this.afStorage.upload(
      photoPathOnServer,
      this.photo.file
    );

    currentUpload.catch((err) => console.error(err)); //permet de faire afficher des erreurs

    currentUpload
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.photoServerURL = photoRef.getDownloadURL();
          this.photoServerURL.subscribe((data) => {
            console.log('data >>> ', data);
            console.log('photoServerURL >>> ', this.photoServerURL);
            this.uploadedImgURL = data;
            
            console.log('uploadedImgURL', this.uploadedImgURL);


            const result =  this.productService.updateProduct(this.productForm.value as any);
            this.modalController.dismiss();
          
               Toast.show({ 
                text: 'Mise à jour effectué avec succès!'
              });
        
          
            this.productForm.reset();
            
            //Question à voir avec Nico : à décommenter plus tard ou même effacer 
            this.productService.updateProductsWithUID(
              this.user,
              this.uploadedImgURL
            );


          });
        })
      )
      .subscribe();   
  }*/

  
  
    

    //this.router.navigate(['/product']); //pas utile //on a juste à fermer le modal
}

