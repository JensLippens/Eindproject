import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './producten/product-list/product-list.component';
import { ProductCreateComponent } from './producten/product-create/product-create.component';
import { ProductDetailComponent } from './producten/product-detail/product-detail.component';
import { ProductFilterComponent } from './producten/product-filter/product-filter.component';

import { AngularMaterialModule } from "./angular-material.module";
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from "./auth/auth-interceptor";
import { MandjeComponent } from './mandje/mandje.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCreateComponent,
    HeaderComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductFilterComponent,
    LoginComponent,
    SignupComponent,
    MandjeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
