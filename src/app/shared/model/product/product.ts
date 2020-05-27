import { IProduct } from './product-service'

//Challenge dispo sur le github + correction
export class Product {
  public id : number
  public productName : string
  public productCode : string
  public releaseDate : string
  public description : string
  public price : number
  public starRating : number
  public imageUrl : string

  constructor(data: IProduct){
      this.fromData(data)
  }

  private fromData(data:IProduct){
    this.id = data.id || null 
    this.productName = data.productName || ''
    this.productCode || ''
    this.releaseDate || ''
    this.description || ''
    this.price || 0
    this.starRating || 0
    this.imageUrl  || ''
  }
}

//let myProductId1.productName;
