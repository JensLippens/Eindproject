import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Product } from "./product.model";
import { Verpakking } from './enums/verpakking';
import { Categorie } from './enums/categorie';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private producten: Product[] = [];
  private productUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient) {}

  getProducten() {
    this.http.get<{ message: string; producten: any }>(
        "http://localhost:3000/api/producten"
      )
      .pipe(map((data) => {
        return data.producten.map(product => {
          return {
            naam: product.naam,
            omschrijving: product.omschrijving,
            prijs: product.prijs,
            verpakking: product.verpakking,
            inhoud: product.inhoud,
            categorie: product.categorie,
            id: product._id
          };
        });
      }))
      .subscribe(gemapteProducten => {
        this.producten = gemapteProducten;
        this.productUpdated.next([...this.producten]);
      });
  }

  getProductenUpdateListener() {
    return this.productUpdated.asObservable();
  }

  addProduct(naam: string,
    omschrijving: string,
    prijs: number,
    verpakking: string,
    inhoud: number,
    categorie: string) {
    const product: Product = {
      id: null,
      naam: naam,
      omschrijving: omschrijving,
      prijs: prijs,
      verpakking: verpakking,
      inhoud: inhoud,
      categorie: categorie
     };
    this.http
      .post<{ message: string, productId: string }>("http://localhost:3000/api/producten", product)
      .subscribe(responseData => {
        const id = responseData.productId;
        product.id = id;
        this.producten.push(product);
        this.productUpdated.next([...this.producten]);
      });
  }

  deleteProduct(productId: string) {
    this.http.delete("http://localhost:3000/api/producten/" + productId)
      .subscribe(() => {
        const gefilterdeProducten = this.producten.filter(product => product.id !== productId);
        this.producten = gefilterdeProducten;
        this.productUpdated.next([...this.producten]);
      });
  }
}
