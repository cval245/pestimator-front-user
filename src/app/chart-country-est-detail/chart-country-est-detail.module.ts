import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartCountryEstDetailComponent} from "./chart-country-est-detail/chart-country-est-detail.component";
import {NgChartsModule} from "ng2-charts";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    ChartCountryEstDetailComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FlexLayoutModule,
  ],
  exports: [
    ChartCountryEstDetailComponent
  ]
})
export class ChartCountryEstDetailModule { }
