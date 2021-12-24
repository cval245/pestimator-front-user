import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EstimationsDetailPageRoutingModule} from './estimations-detail-page-routing.module';
import {FamEstDetailComponent} from "./fam-est-detail/fam-est-detail.component";
import {EstimationModule} from "../estimation/estimation.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {ChartFamEstDetailModule} from "../chart-fam-est-detail/chart-fam-est-detail.module";
import {ChartCountryEstDetailModule} from "../chart-country-est-detail/chart-country-est-detail.module";
import {GridCountryEstDetailModule} from "../grid-country-est-detail/grid-country-est-detail.module";
import {GridAggedFamEstModule} from "../grid-agged-fam-est/grid-agged-fam-est.module";


@NgModule({
  declarations: [
    FamEstDetailComponent,
  ],
  imports: [
    CommonModule,
    EstimationModule,
    EstimationsDetailPageRoutingModule,
    ChartFamEstDetailModule,
    ChartCountryEstDetailModule,
    GridCountryEstDetailModule,
    GridAggedFamEstModule,
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
  ]
})
export class EstimationsDetailPageModule { }
