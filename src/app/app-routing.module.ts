import { NgModule } from '@angular/core';
import { RouterModule , Routes} from "@angular/router";

import { BestellingDetailComponent } from './bestelling/bestelling-detail/bestelling-detail.component';
import { BestellingListComponent } from './bestelling/bestelling-list/bestelling-list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MandjeComponent } from './mandje/mandje.component';
import { ProductListComponent } from './producten/product-list/product-list.component';
import { ProductDetailComponent } from './producten/product-detail/product-detail.component';
import { ProductCreateComponent } from './producten/product-create/product-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UpdateUserdataComponent } from './auth/update-userdata/update-userdata.component';

import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { CheckoutGuard } from './checkout/checkout.guard';

const routes: Routes = [
  { path: '', redirectTo: '/producten/list', pathMatch: 'full' },
  { path: 'producten/list', component: ProductListComponent },
  { path: 'producten/product/:productId', component: ProductDetailComponent },
  { path: 'producten/create', component: ProductCreateComponent, canActivate: [AdminGuard]},
  { path: 'producten/edit/:productId', component: ProductCreateComponent, canActivate: [AdminGuard]},
  { path: 'bestellingen/list', component: BestellingListComponent, canActivate: [AdminGuard]},
  { path: 'bestellingen/bestelling/:bestellingId', component: BestellingDetailComponent, canActivate: [AdminGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'updateuserdata', component: UpdateUserdataComponent, canActivate: [AuthGuard]},
  { path: 'mandje', component: MandjeComponent},
  { path: 'checkout', component: CheckoutComponent, canActivate: [CheckoutGuard]},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard, AuthGuard, CheckoutGuard]
})
export class AppRoutingModule { }
