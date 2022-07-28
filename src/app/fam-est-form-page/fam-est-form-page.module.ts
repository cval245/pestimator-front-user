import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FamEstFormPageRoutingModule} from './fam-est-form-page-routing.module';
import {FamEstFormPageComponent} from "./fam-est-form-page/fam-est-form-page.component";
import {FamEstFormModule} from "../fam-est-form/fam-est-form.module";


@NgModule({
  declarations: [
    FamEstFormPageComponent,
  ],
  imports: [
    CommonModule,
    FamEstFormPageRoutingModule,
    FamEstFormModule,
  ]
})
export class FamEstFormPageModule { }
