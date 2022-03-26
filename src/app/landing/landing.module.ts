import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';

import {LandingRoutingModule} from './landing-routing.module';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {ContentFreeModule} from "../content-free/content-free.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {EstimatePatentCostsComponent} from './estimate-patent-costs/estimate-patent-costs.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    EstimatePatentCostsComponent
  ],
  exports: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    LandingRoutingModule,
    ContentFreeModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
  ]
})
export class LandingModule { }
