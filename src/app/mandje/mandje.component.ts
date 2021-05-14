import { Component, OnInit } from '@angular/core';
import { Product } from '../producten/product.model';
import { OrderItem } from './orderitem.model';

import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
import { MandjeService } from './mandje.service';

@Component({
  selector: 'app-mandje',
  templateUrl: './mandje.component.html',
  styleUrls: ['./mandje.component.css']
})
export class MandjeComponent implements OnInit {
  mandjesItems: OrderItem[] = []
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private mandjeItemsListenerSubs: Subscription;

  constructor(
    private authService: AuthService,
    private mandjeService: MandjeService
  ) { }

  ngOnInit(): void {
    this.mandjesItems = this.mandjeService.getMandje();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.mandjeItemsListenerSubs = this.mandjeService
      .getMandjeItemsUpdateListener()
      .subscribe(mandje => {
        this.mandjesItems = mandje;
      });
  }

  verwijderItem(product: Product) {
    this.mandjeService.verwijderOrderItem(product);
  }

  clearMandje(){
    this.mandjeService.clearMandje();
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.mandjeItemsListenerSubs.unsubscribe();
  }

}
