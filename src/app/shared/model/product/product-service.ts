import { Injectable } from '@angular/core';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  /*Injection d'un service HttpClient dans le constructeur */
  
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([])
  public products$: Observable<Product[]> = this._products.asObservable()
  
  constructor(public http : HttpClient) { 

   }

   //Create of an observable from the get method of HttpClient service
   //which will return a IProduct[] object

    public fetch() {
      this.http.get<IProduct[]>('http://localhost:3000/products').pipe(
        tap(products => console.log(`Products number : ${products.length}`)),
        map(products => products.map(product => new Product(product))),
        tap(products => this._products.next(products))
      ).subscribe()
  }
 
  
  public getProducts$(): Observable<Product[]> {
    return this.products$
 }

}


export interface IProduct {
  id : number
  productName : string
  productCode : string
  releaseDate : string
  description : string
  price : number
  starRating : number
  imageUrl : string
}
