import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from './../../service/product.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { DbService } from '../../service/db.service';

import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})
export class ProductInsertComponent implements OnInit {

  productForm: FormGroup;
  message = '';
  user;
  photo = { file: '', title: '' };
  photoServerURL;
  uploadedImgURL = '';
  personalSpace;

  constructor(private fb: FormBuilder, route: ActivatedRoute, private productService: ProductService, private router: Router, private afAuth: AngularFireAuth, private afStorage: AngularFireStorage, /*private db: DbService*/ private prodService : ProductService) { }

  ngOnInit() {
  //ngOnInit(): void {
    this.productForm = this.fb.group({
      imageUrl: [''/*, Validators.required, Validators.minLength(4)*/],
      productName: [''/*, Validators.required*/],
      description: [''/*, Validators.required*/, Validators.minLength(4)],
      price: [''/*, Validators.required*/]
    });

    this.afAuth.authState.subscribe((user) => { //etat actuel utilisateur connecté
      console.log('user', user);

      this.user = user;
      if (this.user) {
        // console.log(this.db.readPersonalSpaceByUID(user.uid));

        this.prodService.readImageWithUID(user.uid).subscribe(
          (data) => {
            console.log('ngOnInt readPersonnalSpaceById / data', data);
            this.personalSpace = data;
            if (!data || data.length === 0) {
              console.log(`Creating a new space for ${user.displayName}`);
              this.prodService.createProductWithUID(this.user);
            }
          },
          (err) => {
            console.error('readPersonalSpaceById error', err);
          }
        );
      }
    });
  }

 

  async onInsertProduct() {
    console.log('photo: ',this.photo);
    console.log('uid : ',this.user.uid);
   
    const uid = this.user.uid;
    console.log('uid: ',this.user.uid);
    const photoPathOnServer = `image-products/${uid}/${this.photo.title}`;
    const photoRef = this.afStorage.ref(photoPathOnServer);
    this.photoServerURL = '';

    console.log('photoPathOnServer', photoPathOnServer);
    //console.log('uid', uid);
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
            const result = this.productService.createProduct(
              this.productForm.value.imageUrl,
              this.productForm.value.productName,
              this.productForm.value.description,
              this.productForm.value.price,
              this.productForm.value.createdAt = Date.now(),
              this.user.uid,
            );
        
            
            console.log('result', result);
            if ((result as any)) {
              this.message = `Product créé avec l'id ${(result as any).id}`;
            }
            this.productForm.reset();
            this.router.navigate(['/product']);

            /*this.prodService.updateProductsWithUID(
              this.user,
              this.uploadedImgURL
            );*/
          });
        })
      )
      .subscribe();

    
  }

  
  onFileChange(e) {
    console.log(e.target.files[0]);
    this.photo.file = e.target.files[0];
  }
}
