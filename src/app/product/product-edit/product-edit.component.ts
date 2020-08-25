import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../modal/modal.component';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from '../../service/product.service';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;


const HTTP_URL_PATTERN: string =
  '^((http[s]?):\\/)\\/?([^:\\/\\s]+)((\\/\\w+)*)([\\w\\-\\.]+[^#?\\s]+)(.*)?(#[\\w\\-]+)?$';
  

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  
})
export class ProductEditComponent implements OnInit {

  @Input() data: IProduct;  
  public productForm: FormGroup
  message = '';
  imageUrl;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private productService: ProductService, private router: Router, public modalController: ModalController) {
    // We create our Form for product 
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async ngOnInit(): Promise<void> {

    this.productForm = this.fb.group({
      id: [null], // It is the same as `id: new FormControl(null)`
      productName: [
        '', // default value
        [
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(80)
         ] // All the validators to run against this field
       ],

      description: [''],
      price: [0, Validators.min(0)],
      imageUrl: ['', Validators.pattern(HTTP_URL_PATTERN)]
 })  

    this.productForm.patchValue(this.data); //met le contenu dans le formulaire
  }

  async onUpdateProduct() {
    console.log('this.suggestionForm.value', this.productForm.value);      
    const result = await this.productService.updateProduct(this.productForm.value as any);
    this.modalController.dismiss();
  
      await Toast.show({ 
        text: 'Mise à jour effectué avec succès!'
      });
    }

    //this.router.navigate(['/product']);
}

