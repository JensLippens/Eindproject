import { NgModule } from '@angular/core';
import { RouterModule , Routes} from "@angular/router";

import { MandjeComponent } from './mandje/mandje.component';
import { ProductListComponent } from './producten/product-list/product-list.component';
import { ProductDetailComponent } from './producten/product-detail/product-detail.component';
import { ProductCreateComponent } from './producten/product-create/product-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/producten/list', pathMatch: 'full' },
  { path: 'producten/list', component: ProductListComponent },
  { path: 'producten/product/:productId', component: ProductDetailComponent },
  { path: 'producten/create', component: ProductCreateComponent, canActivate: [AuthGuard]},
  { path: 'producten/edit/:productId', component: ProductCreateComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'mandje', component: MandjeComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
