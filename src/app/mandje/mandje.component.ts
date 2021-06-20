import { Component, OnInit } from '@angular/core';
import { Product } from '../producten/product.model';
import { OrderItem } from './orderitem.model';

import { Subscription } from "rxjs";

import { MandjeService } from './mandje.service';

@Component({
  selector: 'app-mandje',
  templateUrl: './mandje.component.html',
  styleUrls: ['./mandje.component.css']
})
export class MandjeComponent implements OnInit {
  mandjesItems: OrderItem[] = []
  prijsZonderBtw: number;
  private mandjeItemsListenerSubs: Subscription;

  constructor(
    private mandjeService: MandjeService,
  ) { }

  ngOnInit(): void {
    this.prijsZonderBtw = this.mandjeService.getPrijsZonderBtw()
    this.mandjesItems = this.mandjeService.getMandje();
    this.mandjeItemsListenerSubs = this.mandjeService
      .getMandjeItemsUpdateListener()
      .subscribe(mandje => {
        this.mandjesItems = mandje;
        this.prijsZonderBtw = this.mandjeService.getPrijsZonderBtw();
      });
  }

  updateAantal(product: Product, nieuwAantal: number) {
    this.mandjeService.updateAantalInMandje(product, nieuwAantal);
  }

  verwijderItem(product: Product) {
    this.mandjeService.verwijderOrderItem(product);
  }

  clearMandje(){
    this.mandjeService.clearMandje();
  }
  ngOnDestroy() {
    this.mandjeItemsListenerSubs.unsubscribe();
  }
  checkLeegMandjeVoorRoute() {
    this.mandjeService.kiesRouteOpBasisVanMandje();
  }

}
