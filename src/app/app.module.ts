import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { ProductCreateComponent } from './producten/product-create/product-create.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './producten/product-list/product-list.component';

import { AngularMaterialModule } from "./angular-material.module";

@NgModule({
  declarations: [
    AppComponent,
    ProductCreateComponent,
    HeaderComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
