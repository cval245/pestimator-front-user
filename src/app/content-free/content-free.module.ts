import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeaturesDemonstrationComponent} from './features-demonstration/features-demonstration.component';
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {PricingComponent} from './pricing/pricing.component';
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [
    FeaturesDemonstrationComponent,
    PricingComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
    ]
})
export class ContentFreeModule { }
