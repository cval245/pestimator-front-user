import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {FamilyEstimateMainComponent} from './family-estimate-main/family-estimate-main.component';
import {FamilyEstimateTableComponent} from './family-estimate-table/family-estimate-table.component';
import {FamEstDetailComponent} from './fam-est-detail/fam-est-detail.component';
import {FamEstFormPageComponent} from './fam-est-form-page/fam-est-form-page.component';
import {FamEstFormComponent} from './fam-est-form/fam-est-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {FamEstDetailTableComponent} from './fam-est-detail-table/fam-est-detail-table.component';
import {ChartFamEstDetailComponent} from './chart-fam-est-detail/chart-fam-est-detail.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import {SubmitFamEstFormComponent} from './submit-fam-est-form/submit-fam-est-form.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FamDetTableComponent} from './fam-det-table/fam-det-table.component';
import {FamEstConfirmComponent} from './fam-est-confirm/fam-est-confirm.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {ParameterDetailsComponent} from './parameter-details/parameter-details.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {EstimationRoutingModule} from "./estimation-routing.module";
import {NgChartsModule} from 'ng2-charts';
import {MatRadioModule} from "@angular/material/radio";
import {CustomDetailsFormComponent} from './custom-details-form/custom-details-form.component';
import {MatIconModule} from "@angular/material/icon";
import {CustomCountryDetailsPipe} from './custom-country-details.pipe';
import {FamestformdataSummaryComponent} from './famestformdata-summary/famestformdata-summary.component';
import {CustomOptionsFormComponent} from './custom-options-form/custom-options-form.component';
import {MatTabsModule} from "@angular/material/tabs";
import {GridAggedFamEstComponent} from './grid-agged-fam-est/grid-agged-fam-est.component';
import {AgGridModule} from "ag-grid-angular";
import {ChartCountryEstDetailComponent} from './chart-country-est-detail/chart-country-est-detail.component';
import {GridCountryEstDetailComponent} from './grid-country-est-detail/grid-country-est-detail.component';
import {MatMenuModule} from "@angular/material/menu";
import {TableFamEstSumComponent} from './table-fam-est-sum/table-fam-est-sum.component';

@NgModule({
  declarations: [
    FamilyEstimateMainComponent,
    FamilyEstimateTableComponent,
    FamEstDetailComponent,
    FamEstFormPageComponent,
    FamEstFormComponent,
    FamEstDetailTableComponent,
    ChartFamEstDetailComponent,
    SubmitFamEstFormComponent,
    FamDetTableComponent,
    FamEstConfirmComponent,
    ParameterDetailsComponent,
    CustomDetailsFormComponent,
    CustomCountryDetailsPipe,
    FamestformdataSummaryComponent,
    CustomOptionsFormComponent,
    GridAggedFamEstComponent,
    ChartCountryEstDetailComponent,
    GridCountryEstDetailComponent,
    TableFamEstSumComponent,
  ],
    imports: [
        CommonModule,
        // RouterModule,
        // HttpClientModule,
        EstimationRoutingModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatStepperModule,
        MatTableModule,
      MatDividerModule,
      MatPaginatorModule,
      MatDialogModule,
      FlexLayoutModule,
      ReactiveFormsModule,
      MatListModule,
      MatTooltipModule,
      NgChartsModule,
      MatRadioModule,
      MatIconModule,
      MatTabsModule,
      AgGridModule,
      MatMenuModule,
    ],
    exports: [
        FamEstFormComponent,
        FamEstDetailTableComponent,
        FamilyEstimateTableComponent,
        FamestformdataSummaryComponent
    ]
})
export class EstimationModule { }
