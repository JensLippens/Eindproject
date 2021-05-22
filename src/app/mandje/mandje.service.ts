import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { Product } from '../producten/product.model';
import { OrderItem } from './orderitem.model';
import { ProductFilterComponent } from '../producten/product-filter/product-filter.component';
import { AuthData } from '../auth/auth-data.model';
import { Bestelling } from '../bestelling/bestelling.model';

@Injectable({
  providedIn: 'root'
})
export class MandjeService {
  private mandje: OrderItem[] = [];
  private mandjeUpdatedCount = new Subject<number>();
  private mandjeUpdatedItems = new Subject<OrderItem[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getMandje(){
    return this.mandje;
  }

  getMandjeItemsUpdateListener() {
    return this.mandjeUpdatedItems.asObservable();
  }

  getMandjeCountUpdateListener() {
    return this.mandjeUpdatedCount.asObservable();
  }

  getPrijsZonderBtw(){
    let totaalprijs = 0;
    for (let i = 0; i < this.mandje.length; i++) {
      totaalprijs += this.mandje[i].product.prijs * this.mandje[i].aantal;
    }
    return totaalprijs;
  }

  getAantalProductenInMandje() {
    let aantal = 0;
    for (let i = 0; i < this.mandje.length; i++) {
      aantal += this.mandje[i].aantal;
    }
    return aantal;
  }

  updateAantalInMandje(product: Product, nieuwAantal: number){
    const index = this.mandje.findIndex(item => item.product.id == product.id);
    this.mandje[index].aantal = +nieuwAantal;
    this.updateStorageEnSubjects();
  }

  voegOrderItemToe(product: Product, aantal: number) {
    const checkProductInMandje = this.mandje.findIndex(item => item.product.id === product.id);
    if (checkProductInMandje == -1) {
      const nieuwOrderItem = {product: product, aantal: aantal};
      this.mandje.push(nieuwOrderItem);
    }
    else {
      this.mandje[checkProductInMandje].aantal += aantal;
    }
    this.updateStorageEnSubjects();
  }

  verwijderOrderItem(product: Product) {
    this.mandje = this.mandje.filter(item => item.product.id != product.id);
    this.updateStorageEnSubjects();
  }

  updateStorageEnSubjects() {
    this.saveMandje(this.mandje);
    this.mandjeUpdatedCount.next(this.getAantalProductenInMandje());
    this.mandjeUpdatedItems.next(this.mandje);
  }

  initMandje(){
    const mandjeInhoud = this.getMandjeInhoud();
    if (!mandjeInhoud) {
      return;
    }
    this.mandje = mandjeInhoud.mandje;
  }

  private saveMandje(mandje: OrderItem[]){
    localStorage.setItem("mandje", JSON.stringify(mandje));
  }

  clearMandje() {
    this.mandje.length = 0;
    localStorage.removeItem("mandje");
    this.mandjeUpdatedCount.next(0);
    this.mandjeUpdatedItems.next(this.mandje);
  }

  private getMandjeInhoud() {
    const mandje = localStorage.getItem("mandje");
    if (!mandje) {
      return;
    }
    return {
      mandje: JSON.parse(mandje),
    }
  }

  kiesRouteOpBasisVanMandje() {
    if (this.mandje.length <= 0) {
      this.router.navigate(["/"]);
    }
    else {
      this.router.navigate(["/checkout"]);
    }
  }
  //
}
