import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from './../../service/product.service';
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;


const HTTP_URL_PATTERN: string =
  '^((http[s]?):\\/)\\/?([^:\\/\\s]+)((\\/\\w+)*)([\\w\\-\\.]+[^#?\\s]+)(.*)?(#[\\w\\-]+)?$'

  //const HTTP_URL_PATTERN: string = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$'


@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})
export class ProductInsertComponent implements OnInit {

  public productForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, route: ActivatedRoute, private productService: ProductService, private router: Router) { 
    this.productForm = fb.group({
      id: [null], // It is the same as `id: new FormControl(null)`
      imageUrl: ['', Validators.pattern(HTTP_URL_PATTERN)],
      productName: [
        '', // default value
        [
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(80)
         ] // All the validators to run against this field
       ],
      description: [''],
      price: [1, Validators.min(1)],      
 })  
  
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      imageUrl: ['', Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  async onInsertProduct() {
    console.log('this.productForm.value', this.productForm.value);
    const result = await this.productService.createProduct(
      this.productForm.value.imageUrl,
      this.productForm.value.productName,
      this.productForm.value.description,
      this.productForm.value.price,
    );
    console.log('result', result);
    if ((result as any).jT) {
      this.message = `Product créé avec l'id ${(result as any).id}`;
    }
    this.productForm.reset();
    this.router.navigate(['/product']);
    
  }

}
