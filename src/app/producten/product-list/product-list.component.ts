import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from "../product.model";
import { ProductService } from '../product.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { MandjeService } from 'src/app/mandje/mandje.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  catalogus: Product[] = [];
  gefilterdeProducten: Product[] = [];
  isLoading = false;
  user: AuthData;
  userIsAuthenticated = false;
  private productSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private mandjeService: MandjeService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getProducten();
    this.productSub = this.productService
      .getProductenUpdateListener()
      .subscribe((productenData: Product[]) => {
        this.isLoading = false;
        this.catalogus = productenData;
        this.gefilterdeProducten = productenData;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.user = this.authService.getUser();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.user = this.authService.getUser();
      });
  }

  filterProducten(nieuweProductFilter: Product[]) {
    this.gefilterdeProducten = nieuweProductFilter;
  }

  onDelete(productId: string) {
    this.isLoading = true;
    this.productService.deleteProduct(productId)
      .subscribe(() => {
        this.productService.getProducten();
      });
  }

  legInMandje(product: Product, aantal: number){
    this.mandjeService.voegOrderItemToe(product, aantal);
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
