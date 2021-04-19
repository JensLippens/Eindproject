import { NgModule } from "@angular/core";

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
  ]
})
export class AngularMaterialModule {}
