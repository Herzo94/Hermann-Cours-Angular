import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IProduct } from '../models/IProduct';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private imageProductCollection: AngularFirestoreCollection<IProduct>;
  imagesProducts: Observable<IProduct[]>;

  collectionName = 'table-product';
  constructor(private afs: AngularFirestore, private router: Router ) { }

  readProduct() {
    return this.afs.collection<IProduct>(`${this.collectionName}`, (ref) =>
      ref.orderBy('createdAt', 'desc')
    );
  }

  createProduct(imageUrl, productName, description, price, createdAt, uid) {
    return this.afs
      .collection(`${this.collectionName}`)
      .add({imageUrl, productName, description, price, createdAt, uid});
  }


  readImageWithUID(uid: string) {
    return this.afs
      .collection<IProduct>(`${this.collectionName}`, (ref) => 
      ref.orderBy('createdAt', 'desc').where('uid', '==', uid,
      
      ))

      .valueChanges({ idField: 'id' });
  }
  

  createProductWithUID(user) {
    return this.imageProductCollection.doc(`${this.collectionName}-${user.uid}`).set({
      uid: user.uid,
      displayName: user.displayName,
      createdAt: new Date(),
      imageUrl: '',
      productName: '',
      description : '',
      price: '', 
    });
  }

  //Update product
  updateProduct(product) {
    return this.afs.doc(`${this.collectionName}/${product.id}`).update({
      ...product,
      imageUrl: product.imageUrl,
      name: product.productName,
      description : product.description,
      price: product.price,
    });
  }

  updateProductsWithUID(user, photoURL) {
    return this.afs
      .collection(`${this.collectionName}`)
      //.doc(`ps-${user.uid}`) //décommenter ce bout de code si ça ne marche pas 
      .doc(`${this.collectionName}-${user.uid}`)
      .update({
        photoURLs: firestore.FieldValue.arrayUnion(photoURL),
      });
  }

  //Suppression avec modal ou juste en cliquant sur la croix
  
  deleteProduct(id) {
    return this.afs
      .doc<IProduct>(`${this.collectionName}/${id}`)
      .delete();
  }
}
