import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

import { Product } from "./product.model";
import { Verpakking } from './enums/verpakking';
import { Categorie } from './enums/categorie';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  verpakkingen: string[] = ["pot", "tube", "flacon"];
  categories: string[] = ["gelaat", "haar", "douche", "makeup", "parfum"];

  private producten: Product[] = [];
  private productUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getProducten() {
    this.http
      .get<{ message: string; producten: any }>("http://localhost:3000/api/producten")
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
      "http://localhost:3000/api/producten/" + id
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
    productData.append("naam", naam);
    productData.append("omschrijving", omschrijving);
    productData.append("prijs", prijs.toString());
    productData.append("verpakking", verpakking);
    productData.append("inhoud", inhoud.toString());
    productData.append("categorie", categorie);
    productData.append("image", image, naam);
    this.http
      .post<{ message: string, product: Product }>(
        "http://localhost:3000/api/producten/",
        productData
      )
      .subscribe(responseData => {
       /*  const product: Product = {
          id: responseData.product.id,
          naam: naam,
          omschrijving: omschrijving,
          prijs: prijs,
          verpakking: verpakking,
          inhoud: inhoud,
          categorie: categorie,
          imagePath: responseData.product.imagePath
        };
        this.producten.push(product);
        this.productUpdated.next([...this.producten]); */
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
      .put("http://localhost:3000/api/producten/" + id, productData)
      .subscribe(responseData => {
        /* const updatedProducten = [...this.producten];
        const oldProductIndex = updatedProducten.findIndex(p => p.id === id);
        const product: Product = {
          id: id,
          naam: naam,
          omschrijving: omschrijving,
          prijs: prijs,
          verpakking: verpakking,
          inhoud: inhoud,
          categorie: categorie,
          imagePath: ""
        };
        updatedProducten[oldProductIndex] = product;
        this.producten = updatedProducten;
        this.productUpdated.next([...this.producten]); */
        this.router.navigate(["/"]);
      });
  }

  deleteProduct(productId: string) {
    return this.http
      .delete("http://localhost:3000/api/producten/" + productId);
    /*   .subscribe(() => {
        const gefilterdeProducten = this.producten.filter(product => product.id !== productId);
        this.producten = gefilterdeProducten;
        this.productUpdated.next([...this.producten]);
      }); */
  }
}
