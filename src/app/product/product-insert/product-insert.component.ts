import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, from } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { IProduct } from '../../models/IProduct';
import { Router } from '@angular/router';
import { ProductService } from './../../service/product.service';


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
  private productSubscription: Subscription;
  message = '';

  constructor(private fb: FormBuilder, route: ActivatedRoute, private productService: ProductService, private router: Router) { 
    this.productForm = fb.group({
      id: [null], // It is the same as `id: new FormControl(null)`
      name: [
        '', // default value
        [
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(80)
         ] // All the validators to run against this field
       ],
      image: ['', Validators.pattern(HTTP_URL_PATTERN)],
      description: [''],
      price: [1, Validators.min(1)],
      starRating: [0, [Validators.min(0), Validators.max(5)]],
      
 })  
  
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      rating: ['', Validators.required],
    });
  }

  // This methods run when Angular destroy a component (cf component life cycle)
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe() // We unsubscribe from the observable
  }

  async onInsertProduct() {
    console.log('this.suggestionForm.value', this.productForm.value);
    const result = await this.productService.createProduct(
      this.productForm.value.imageUrl,
      this.productForm.value.name,
      this.productForm.value.description,
      this.productForm.value.prix,
      this.productForm.value.rating
    );
    console.log('result', result);
    if ((result as any).jT) {
      this.message = `Restaurant créé avec l'id ${(result as any).id}`;
    }
    this.router.navigate(['/product']); //Question problèeme de retour à la page list après insertion
    this.productForm.reset();
  }

}
