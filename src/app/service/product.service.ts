import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct } from '../models/IProduct';

import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore, private router: Router ) { }

  readProduct() {
    return this.afs.collection<IProduct>('table-product', (ref) =>
      ref.orderBy('productName', 'asc')
    );
  }

  createProduct(imageUrl, productName, description, price) {
    return this.afs
      .collection('table-product')
      .add({imageUrl, productName, description, price});
      //this.router.navigate(['/dashboard']);
  }

  //Update product
  updateProduct(product) {
    return this.afs.doc(`table-product/${product.id}`).update({
      ...product,
      imageUrl: product.imageUrl,
      name: product.productName,
      description : product.description,
      price: product.price,
    });
  }

  //Suppression avec modal ou juste en cliquant sur la croix
  
  deleteProduct(id) {
    return this.afs
      .doc<IProduct>(`table-product/${id}`)
      .delete();
  }
}
