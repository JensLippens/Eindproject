import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { Product } from '../product.model';
import { ProductService} from "../product.service";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  categories: string[];
  verpakkingen: string[];
  product: Product;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private productId: string;
  private authStatusSub: Subscription

  constructor(
    public productService: ProductService,
    public route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
        this.isLoading = false;
    });
    this.categories = this.productService.categories;
    this.verpakkingen = this.productService.verpakkingen;
    this.form = new FormGroup({
      naam: new FormControl(null, { validators: [Validators.required] }),
      omschrijving: new FormControl(null, { validators: [Validators.required] }),
      prijs: new FormControl(null, { validators: [Validators.required] }),
      verpakking: new FormControl(null, { validators: [Validators.required] }),
      inhoud: new FormControl(null, { validators: [Validators.required] }),
      categorie: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')){
        this.mode = 'edit';
        this.productId = paramMap.get('productId');
        this.isLoading = true;
        this.productService.getProduct(this.productId).subscribe(productData => {
          // console.log(productData);
          this.isLoading = false;
          this.product = {
            id: productData._id,
            naam: productData.naam,
            omschrijving: productData.omschrijving,
            prijs: productData.prijs,
            verpakking: productData.verpakking,
            inhoud: productData.inhoud,
            categorie : productData.categorie,
            imagePath: productData.imagePath
          };
          this.form.setValue({
            naam: this.product.naam,
            omschrijving: this.product.omschrijving,
            prijs: this.product.prijs,
            verpakking: this.product.verpakking,
            inhoud: this.product.inhoud,
            categorie: this.product.categorie,
            image: this.product.imagePath,
          });
        });
      } else {
        this.mode = 'create';
        this.productId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveProduct(){
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.productService.addProduct(
        this.form.value.naam,
        this.form.value.omschrijving,
        this.form.value.prijs,
        this.form.value.verpakking,
        this.form.value.inhoud,
        this.form.value.categorie,
        this.form.value.image
      );
    } else { // this.mode === "edit"
        this.productService.updateProduct(
          this.productId,
          this.form.value.naam,
          this.form.value.omschrijving,
          this.form.value.prijs,
          this.form.value.verpakking,
          this.form.value.inhoud,
          this.form.value.categorie,
          this.form.value.image
        );
      }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
