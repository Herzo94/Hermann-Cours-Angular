import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
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
