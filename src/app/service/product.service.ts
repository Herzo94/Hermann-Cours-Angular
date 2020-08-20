import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/firestore';
import { IProduct } from '../models/IProduct';

import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { firestore } from 'firebase';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private imageProductCollection: AngularFirestoreCollection<IProduct>;
  imagesProducts: Observable<IProduct[]>;

  constructor(private afs: AngularFirestore, private router: Router ) { }

  readProduct() {
    return this.afs.collection<IProduct>('table-product', (ref) =>
      ref.orderBy('createdAt', 'desc')
    );
  }

  readImageWithUID(uid: string) {
    return this.afs
      .collection('table-product', (ref) => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' });
  }

  createProduct(imageUrl, productName, description, price, createdAt, uid) {
    return this.afs
      .collection('table-product')
      .add({imageUrl, productName, description, price, createdAt, uid});
  }

  createProductWithUID(user) {
    return this.imageProductCollection.doc(`table-product-${user.uid}`).set({
      uid: user.uid,
      displayName: user.displayName,
      createdAt: Date.now(),
      imageUrl: '',
      productName: '',
      description : '',
      price: '',
      
    });
  }

  //Update product
  updateProduct(product) {
    return this.afs.doc(`table-product/${product.id}`).update({
      ...product,
      imageUrl: product.imageUrl,
      name: product.productName,
      description : product.description,
      price: product.price,
      //createdAt: Date.now(),
    });
  }

  updateProductsWithUID(user, photoURL) {
    return this.afs
      .collection('table-product')
      .doc(`ps-${user.uid}`)
      .update({
        photoURLs: firestore.FieldValue.arrayUnion(photoURL),
      });
  }

  //Suppression avec modal ou juste en cliquant sur la croix
  
  deleteProduct(id) {
    return this.afs
      .doc<IProduct>(`table-product/${id}`)
      .delete();
  }
}
