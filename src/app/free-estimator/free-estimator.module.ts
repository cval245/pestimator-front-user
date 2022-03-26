import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FreeEstimatorRoutingModule} from './free-estimator-routing.module';
import {MainPageComponent} from './main-page/main-page.component';
import {EstimatorComponent} from './estimator/estimator.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {ChartFamEstDetailModule} from "../chart-fam-est-detail/chart-fam-est-detail.module";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    MainPageComponent,
    EstimatorComponent
  ],
    imports: [
        CommonModule,
        FreeEstimatorRoutingModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        ChartFamEstDetailModule,
        MatButtonModule
    ]
})
export class FreeEstimatorModule { }
