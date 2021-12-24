import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EstimationsPageRoutingModule} from './estimations-page-routing.module';
import {FamilyEstimateMainComponent} from "./family-estimate-main/family-estimate-main.component";
import {FamilyEstimateTableModule} from "../family-estimate-table/family-estimate-table.module";


@NgModule({
  declarations: [
    FamilyEstimateMainComponent,
  ],
  imports: [
    CommonModule,
    // EstimationModule,
    FamilyEstimateTableModule,
    EstimationsPageRoutingModule
  ]
})
export class EstimationsPageModule { }
