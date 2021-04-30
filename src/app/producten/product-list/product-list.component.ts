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
  isLoading = false;
  private productSub: Subscription;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getProducten();
    this.productSub = this.productService
      .getProductenUpdateListener()
      .subscribe((producten: Product[]) => {
        this.isLoading = false;
        this.producten = producten;
      });
  }

  onDelete(productId: string) {
    this.productService.deleteProduct(productId)
      .subscribe(() => {
        this.productService.getProducten();
      });
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
}
