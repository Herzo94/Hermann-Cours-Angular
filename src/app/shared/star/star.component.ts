import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  //Input et Output ok!
  
  //Pas réussir à afficher les étoiles
  
  //eventmitter -> Interface, Class dispo par Angular -> Package oû il y a les methodes essentielles à angular pas clair non plus
  //Problème au clique

  @Input() rating : number = 4;  //Argument optionnel // -> Bouton configuration
  @Output() ratingClicked: EventEmitter<number> = new EventEmitter<number>() //Notifie quand il y a un changement, output return de la fonction / Sonnerie

  constructor() { }

  ngOnInit(): void {
  }

  public logIt(value:number) :void {
    console.log("Value click is ", value)
    this.ratingClicked.emit(value)
  }

}
