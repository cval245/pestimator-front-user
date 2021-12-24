import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {FamEstDetailTableComponent} from './fam-est-detail-table/fam-est-detail-table.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import {SubmitFamEstFormComponent} from './submit-fam-est-form/submit-fam-est-form.component';
import {FamDetTableComponent} from './fam-det-table/fam-det-table.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {ParameterDetailsComponent} from './parameter-details/parameter-details.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {EstimationRoutingModule} from "./estimation-routing.module";

import {CustomCountryDetailsPipe} from './custom-country-details.pipe';
import {FamestformdataSummaryComponent} from './famestformdata-summary/famestformdata-summary.component';
import {TableFamEstSumComponent} from './table-fam-est-sum/table-fam-est-sum.component';

@NgModule({
  declarations: [
    FamEstDetailTableComponent,
    SubmitFamEstFormComponent,
    FamDetTableComponent,
    ParameterDetailsComponent,
    CustomCountryDetailsPipe,
    FamestformdataSummaryComponent,
    TableFamEstSumComponent,
  ],
  imports: [
    CommonModule,
    EstimationRoutingModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatDividerModule,
    MatDialogModule,
    FlexLayoutModule,
    MatListModule,
    MatTooltipModule,
  ],
  exports: [
    FamDetTableComponent,
    FamEstDetailTableComponent,
    FamestformdataSummaryComponent,
    TableFamEstSumComponent,
  ]
})
export class EstimationModule {
}
