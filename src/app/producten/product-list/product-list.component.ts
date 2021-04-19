import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from "../product.model";
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  producten: Product[] = [];
  private productSub: Subscription;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducten();
    this.productSub = this.productService
      .getProductenUpdateListener()
      .subscribe((producten: Product[]) => {
        this.producten = producten;
      });
  }

  onDelete(productId: string) {
    this.productService.deleteProduct(productId);
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }


}
