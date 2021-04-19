import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ProductService} from "../product.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  constructor(public productService: ProductService) { }

  ngOnInit(): void {
  }

  onAddProduct(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.productService.addProduct(
      form.value.naam,
      form.value.omschrijving,
      form.value.prijs,
      form.value.verpakking,
      form.value.inhoud,
      form.value.categorie,
    );
    form.resetForm();
  }
}
