import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';

import { FamilyEstimateMainComponent } from './family-estimate-main/family-estimate-main.component';
import { FamilyEstimateTableComponent } from './family-estimate-table/family-estimate-table.component';
import { FamEstDetailComponent } from './fam-est-detail/fam-est-detail.component';
import { FamEstFormPageComponent } from './fam-est-form-page/fam-est-form-page.component';
import { FamEstFormComponent } from './fam-est-form/fam-est-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { ChartsModule } from 'ng2-charts';
import { FamEstDetailTableComponent } from './fam-est-detail-table/fam-est-detail-table.component';
import { ChartFamEstDetailComponent } from './chart-fam-est-detail/chart-fam-est-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import { SubmitFamEstFormComponent } from './submit-fam-est-form/submit-fam-est-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FamDetTableComponent } from './fam-det-table/fam-det-table.component';

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
  ],
  imports: [
      CommonModule,
      RouterModule,
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
      FlexLayoutModule,
      ChartsModule,
      ReactiveFormsModule,
  ],
    exports: [
        FamEstFormComponent
    ]
})
export class EstimationModule { }
