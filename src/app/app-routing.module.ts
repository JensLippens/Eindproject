import { NgModule } from '@angular/core';
import { RouterModule , Routes} from "@angular/router";

import { ProductListComponent } from './producten/product-list/product-list.component';
import { ProductDetailComponent } from './producten/product-detail/product-detail.component';
import { ProductCreateComponent } from './producten/product-create/product-create.component';
import { ProductFilterComponent } from './producten/product-filter/product-filter.component';

const routes: Routes = [
  { path: '', redirectTo: '/producten/list', pathMatch: 'full' },
  { path: 'producten/list', component: ProductListComponent },
  { path: 'producten/product/:productId', component: ProductDetailComponent },
  { path: 'producten/create', component: ProductCreateComponent},
  { path: 'producten/edit/:productId', component: ProductCreateComponent},
  { path: 'producten/test', component: ProductFilterComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
