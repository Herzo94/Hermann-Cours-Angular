import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { IProduct, Product } from './../shared/model/product/product';
import { ProductService } from './../shared/model/product/product-service';
import { Router } from '@angular/router';


const HTTP_URL_PATTERN: string =
  '^((http[s]?):\\/)\\/?([^:\\/\\s]+)((\\/\\w+)*)([\\w\\-\\.]+[^#?\\s]+)(.*)?(#[\\w\\-]+)?$'


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styles: [
  ]
})
export class ProductEditComponent implements OnInit {

  public productForm: FormGroup
  // This is used to store the subscription in order to clean it with the component
  private productSubscription: Subscription

  constructor(fb: FormBuilder, route: ActivatedRoute, public productService: ProductService, private router: Router) {
    // We create our Form for product 
    this.productForm = fb.group({
             id: [null], // It is the same as `id: new FormControl(null)`
             productName: [
               '', // default value
               [
                 Validators.required, 
                 Validators.minLength(8), 
                 Validators.maxLength(80)
                ] // All the validators to run against this field
              ],
             productCode: [''],
             releaseDate: [new Date()],
             description: [''],
             price: [0, Validators.min(0)],
             starRating: [0, [Validators.min(0), Validators.max(5)]],
             imageUrl: ['', Validators.pattern(HTTP_URL_PATTERN)]
        })   
        // The observable below retrieve the URL and ensure that it is a valid number
    let currentId$: Observable<number> = route.paramMap.pipe(   // The source is the router params
      map(params => params.get('id')),                   // We extract the param named "id"
      filter(id => id !== null),                       // We filter to get only if id is not null
      map(id => Number(id))                              // We cast the string from URL to a Number
    )

    // The subscription below will be store in productSubscription to destroy it with the component
    this.productSubscription = currentId$.pipe(                   // The source is the current id
      switchMap(id => productService.getProductById$(id)), // We change the source with the product of current id
      filter(product => product instanceof Product)      // We filter to avoid null/undefined value
    ).subscribe( // We subscribe (think about unsubscribe)
      product => this.productForm.setValue(product)         // We update the form
    ) 
  }

  ngOnInit(): void {
  }

  // This methods run when Angular destroy a component (cf component life cycle)
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe() // We unsubscribe from the observable
  }

  public onSubmit() {
    
    console.log('Form submitted')

    if (this.productForm.valid) {
      let data: IProduct = this.productForm.value
      this.productService.save(data).subscribe(
      product => console.log(`My product was saved ${product.id}`)
      )
    }

    this.router.navigate(['/product']);
  }
}
