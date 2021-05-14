import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MandjeService } from 'src/app/mandje/mandje.service';

import { Product } from '../product.model';
import { ProductService} from "../product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  productId: string;
  value = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private mandjeService: MandjeService,
  ) { }

  handleMinus() {
    if (this.value > 1){
      this.value--;
    }
  }
  handlePlus() {
    this.value++;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.productId = paramMap.get('productId');
      this.productService.getProduct(this.productId).subscribe(fetchedProduct => {
        console.log(fetchedProduct);
        this.product = {
          id: fetchedProduct._id,
          naam: fetchedProduct.naam,
          omschrijving: fetchedProduct.omschrijving,
          prijs: fetchedProduct.prijs,
          verpakking: fetchedProduct.verpakking,
          inhoud: fetchedProduct.inhoud,
          categorie: fetchedProduct.categorie,
          imagePath: fetchedProduct.imagePath,
        }
      })
    });
  }

  legInMandje(product: Product, aantal: number){
    this.mandjeService.voegOrderItemToe(product, +aantal);
  }
}
