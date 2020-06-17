import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from './../service/product.service';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
// Question comment faire si je veux utiliser le modal pour les réservations et pas que pour les produits ?
  constructor(
    private ps: ProductService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data
  ) 
  
  {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close('nope');
  }

  async delete() {
    console.log('TODO delete ', this.data);
    const result = await this.ps.deleteProduct(this.data);
    this.dialogRef.close(result);
  }

}
