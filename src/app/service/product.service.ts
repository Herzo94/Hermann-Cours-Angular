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
      ref.orderBy('name', 'asc')
    );
  }

  createProduct(image, name, description, prix, rating) {
    return this.afs
      .collection('table-product')
      .add({image, name, description, prix, rating});
      //this.router.navigate(['/dashboard']);
  }

  //Update product
  updateProduct(product) {
    return this.afs.doc(`table-product/${product.id}`).update({
      ...product,
      image: product.image,
      name: product.name,
      description : product.description,
      prix: product.prix,
      rating: product.rating
    });
  }

  //Suppression avec modal ou juste en cliquant sur la croix
  
  deleteProduct(id) {
    return this.afs
      .doc<IProduct>(`table-product/${id}`)
      .delete();
  }
}
