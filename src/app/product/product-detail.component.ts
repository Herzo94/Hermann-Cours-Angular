import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../shared/model/product/product-service';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Product } from './../shared/model/product/product';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
    
export class ProductDetailComponent implements OnInit {
  public product$: Observable<Product>

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    
    let currentId$: Observable<number> = route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => id !== null),
      map(id => Number(id))
    )

    this.product$ = currentId$.pipe(
      switchMap(id => productService.getProductById$(id))
    )
  }

  ngOnInit(): void {
  }
  public goToProducts() {
    this.router.navigate(['/products'])
  }
}