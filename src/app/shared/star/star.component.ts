import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input() rating : number = 4; //1. déclaration de la variable dans le fichier .ts
  @Output() ratingClicked: EventEmitter<number> = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  public logIt(value:number) :void {
    console.log("Value click is ", value)
    this.ratingClicked.emit(value)
  }

}
