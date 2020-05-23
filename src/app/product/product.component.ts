import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {
  public imageIsShown: boolean = true; // display (true) by default
  public noProductTemplate: string = 'Pas de tableau';
  public searchText: string = 'hallo';

  //Fonction appelée lors du clic
  toggleImage() {
      this.imageIsShown =! this.imageIsShown; // n'est pas égal donc l'inverse de true et vice versa
    }

  //constructor() { } // mettre ce bout de code en commentaire car il sert à rien n'est-ce pas ??????? 

  ngOnInit(): void {}

  searchProduct: string; // Cette déclaration pas nécéssaire on dirait ?????????
  //Question GIT -> Comment publier les modifs réalisé en local sur le master du site github afin de voir les modifications directement depuis le site (J'avais déjà posé cette question)
  //-> $ Git rebase master ??
  //Realision des quelques exercies sur le site de git jusqu'au -> git rebase master
  //+ Réaliser les commits directement depuuis le terminal après avoir -> géré les states changed

  public products: Product[] = [
    {
        "id": 1,
        "productName": "Leaf Rake",
        "productCode": "GDN-0011",
        "releaseDate": "March 19, 2016",
        "description": "Leaf rake with 48-inch wooden handle.",
        "price": 19.95,
        "starRating": 3.2,
        "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    },
    {
        "id": 2,
        "productName": "Garden Cart",
        "productCode": "GDN-0023",
        "releaseDate": "March 18, 2016",
        "description": "15 gallon capacity rolling garden cart",
        "price": 32.99,
        "starRating": 4.2,
        "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
    },
    {
        "id": 5,
        "productName": "Hammer",
        "productCode": "TBX-0048",
        "releaseDate": "May 21, 2016",
        "description": "Curved claw steel hammer",
        "price": 8.9,
        "starRating": 4.8,
        "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
    },
    {
        "id": 8,
        "productName": "Saw",
        "productCode": "TBX-0022",
        "releaseDate": "May 15, 2016",
        "description": "15-inch steel blade hand saw",
        "price": 11.55,
        "starRating": 3.7,
        "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
    },
    {
        "id": 10,
        "productName": "Video Game Controller",
        "productCode": "GMG-0042",
        "releaseDate": "October 15, 2015",
        "description": "Standard two-button video game controller",
        "price": 35.95,
        "starRating": 4.6,
        "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
    }
  ]
}

export interface Product {
  id : number
  productName : string
  productCode : string
  releaseDate : string
  description : string
  price : number
  starRating : number
  imageUrl : string
}