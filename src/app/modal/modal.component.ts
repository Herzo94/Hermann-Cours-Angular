import { Component, OnInit, Inject, Input } from '@angular/core';
import { ProductService } from './../service/product.service';
import { IReservation } from '../models/IReservation';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
// Question comment faire si je veux utiliser le modal pour les réservations et pas que pour les produits ?
@Input() data: IReservation;  
constructor(
    private ps: ProductService,
    //public dialogRef: MatDialogRef<any>,
    //@Inject(MAT_DIALOG_DATA) public data
    public modalController: ModalController,
  ) 
  
  {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.modalController.dismiss('nope');
  }

  async delete() {
    console.log('TODO delete ', this.data);
    const result = await this.ps.deleteProduct(this.data);
    this.modalController.dismiss(result);
  }

}
