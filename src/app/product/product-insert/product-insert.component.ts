import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from './../../service/product.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})
export class ProductInsertComponent implements OnInit, OnDestroy {

  productForm: FormGroup;
  message = '';
  user;
  photo = { file: '', title: '' };
  photoServerURL;
  uploadedImgURL = '';
  personalSpace;
  sub;

  constructor(private fb: FormBuilder, route: ActivatedRoute, private productService: ProductService, private router: Router, private afAuth: AngularFireAuth, private afStorage: AngularFireStorage) { }
  //ENLEVER LA VARIABLE prodService, car c'est répétitif
  ngOnInit() {
  //ngOnInit(): void {
    this.productForm = this.fb.group({
      imageUrl: [''/*, Validators.required*/],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.sub = this.afAuth.authState.subscribe((user) => { //etat actuel utilisateur connecté
      console.log('user', user);

      this.user = user;
      if (this.user) {
         console.log(this.productService.readImageWithUID(user.uid));

        this.productService.readImageWithUID(user.uid).subscribe(
          (data) => {
            console.log('ngOnInt readPersonnalSpaceById / data', data);
            this.personalSpace = data;
            if (!data || data.length === 0) {
              console.log(`Creating a new space for ${user.displayName}`);
              this.productService.createProductWithUID(this.user);
              //Question check ici 
              //this.productService.createProductWithUID(this.personalSpace);
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
    //const photoPathOnServer = `image-products/${uid}/${this.photo.title}`;
    const photoPathOnServer = `image-products/${this.photo.title}`; //Pas utile d'enregistrer avec un id
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

            const result = this.productService.createProduct(
              //this.productForm.value.imageUrl,
              this.uploadedImgURL,
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

            Toast.show({ //à tester si ok
              text: 'Insertion effectué avec succès!'
            });

            this.productForm.reset();
            this.router.navigate(['/product']);
            
            //Question à voir avec Nico : à décommenter plus tard ou même effacer 
            /*this.productService.updateProductsWithUID(
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

  ngOnDestroy() {//obliger pour que ça soit perdormant //pas bloquer ressource système
    this.sub.unsubscribe();
  }
}
