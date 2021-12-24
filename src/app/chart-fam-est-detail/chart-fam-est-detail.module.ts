import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartFamEstDetailComponent} from "./chart-fam-est-detail/chart-fam-est-detail.component";
import {NgChartsModule} from "ng2-charts";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    ChartFamEstDetailComponent,
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FlexLayoutModule,
  ],
  exports: [
    ChartFamEstDetailComponent,
  ]
})
export class ChartFamEstDetailModule { }
