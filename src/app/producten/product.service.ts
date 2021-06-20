import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

import { Product } from "./product.model";
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/producten/";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  verpakkingen: string[] = ["Pot", "Tube", "Flacon", "Verstuiver"];
  categories: string[] = ["Gelaat", "Haar", "Douche", "Makeup", "Parfum"];

  private producten: Product[] = [];
  private productUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getProducten() {
    this.http
      .get<{ message: string; producten: any }>(BACKEND_URL)
      .pipe(
        map(data => {
          return data.producten.map(product => {
            return {
              naam: product.naam,
              omschrijving: product.omschrijving,
              prijs: product.prijs,
              verpakking: product.verpakking,
              inhoud: product.inhoud,
              categorie: product.categorie,
              id: product._id,
              imagePath: product.imagePath,
            };
          });
        })
      )
      .subscribe(gemapteProducten => {
        this.producten = gemapteProducten;
        this.productUpdated.next([...this.producten]);
      });
  }

  getProductenUpdateListener() {
    return this.productUpdated.asObservable();
  }

  getProduct(id: string) {
    return this.http.get<{
      _id: string,
      naam: string,
      omschrijving: string,
      prijs: number,
      verpakking: string,
      inhoud: number,
      categorie: string,
      imagePath: string,
    }>(
      BACKEND_URL + id
    );
  }

  addProduct(naam: string,
    omschrijving: string,
    prijs: number,
    verpakking: string,
    inhoud: number,
    categorie: string,
    image: File) {
    const productData = new FormData();
    console.log(naam, omschrijving, prijs, verpakking, inhoud, categorie, image)

    productData.append("naam", naam);
    productData.append("omschrijving", omschrijving);
    productData.append("prijs", prijs.toString());
    productData.append("verpakking", verpakking);
    productData.append("inhoud", inhoud.toString());
    productData.append("categorie", categorie);
    productData.append("image", image, naam);
    console.log(productData);
    this.http
      .post<{ message: string, product: Product }>(
        BACKEND_URL,
        productData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updateProduct(id:string,
    naam: string,
    omschrijving: string,
    prijs: number,
    verpakking: string,
    inhoud: number,
    categorie: string,
    image: File | string) {
    let productData: Product | FormData;
    if (typeof(image) === 'object'){
      productData = new FormData();
      productData.append("id", id);
      productData.append("naam", naam);
      productData.append("omschrijving", omschrijving);
      productData.append("prijs", prijs.toString());
      productData.append("verpakking", verpakking);
      productData.append("inhoud", inhoud.toString());
      productData.append("categorie", categorie);
      productData.append("image", image, naam);
    } else {
      productData = {
        id: id,
        naam: naam,
        omschrijving: omschrijving,
        prijs: prijs,
        verpakking: verpakking,
        inhoud: inhoud,
        categorie: categorie,
        imagePath: image
      };
    }
    this.http
      .put(BACKEND_URL + id, productData)
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  deleteProduct(productId: string) {
    return this.http
      .delete(BACKEND_URL + productId);
  }
}
