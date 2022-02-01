import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeaturesDemonstrationComponent} from './features-demonstration/features-demonstration.component';
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {PricingComponent} from './pricing/pricing.component';
import {MatDividerModule} from "@angular/material/divider";
import {ExampleReportComponent} from './example-report/example-report.component';
import {FlexModule} from "@angular/flex-layout";
import {AdvertisingOneComponent} from './advertising-one/advertising-one.component';


@NgModule({
  declarations: [
    FeaturesDemonstrationComponent,
    PricingComponent,
    ExampleReportComponent,
    AdvertisingOneComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FlexModule,
  ]
})
export class ContentFreeModule { }
