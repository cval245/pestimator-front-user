import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FamEstFormComponent} from "./fam-est-form/fam-est-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatStepperModule} from "@angular/material/stepper";
import {MatRadioModule} from "@angular/material/radio";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CustomDetailsFormComponent} from "./custom-details-form/custom-details-form.component";
import {CustomOptionsFormComponent} from "./custom-options-form/custom-options-form.component";
import {MatDialogModule} from "@angular/material/dialog";
import {FamEstConfirmComponent} from "./fam-est-confirm/fam-est-confirm.component";
import {EstimationModule} from "../estimation/estimation.module";
import {FamilyFormComponent} from './family-form/family-form.component';
import {FirstApplFormComponent} from './first-appl-form/first-appl-form.component';
import {InternationalStageFormComponent} from './international-stage-form/international-stage-form.component';
import {EpStageFormComponent} from './ep-stage-form/ep-stage-form.component';
import {ParisStageFormComponent} from './paris-stage-form/paris-stage-form.component';
import {SingleUtilityFormComponent} from './single-utility-form/single-utility-form.component';
import {StepperButtonsNextComponent} from './stepper-buttons-next/stepper-buttons-next.component';
import {StepperButtonsFinalComponent} from './stepper-buttons-final/stepper-buttons-final.component';
import {CustomApplDetailsComponent} from './custom-appl-details/custom-appl-details.component';
import {CustomApplOptionsComponent} from './custom-appl-options/custom-appl-options.component';
import {AddlInfoFormComponent} from './addl-info-form/addl-info-form.component';


@NgModule({
  declarations: [
    FamEstFormComponent,
    CustomDetailsFormComponent,
    CustomOptionsFormComponent,
    FamEstConfirmComponent,
    FamilyFormComponent,
    FirstApplFormComponent,
    InternationalStageFormComponent,
    EpStageFormComponent,
    ParisStageFormComponent,
    SingleUtilityFormComponent,
    StepperButtonsNextComponent,
    StepperButtonsFinalComponent,
    CustomApplDetailsComponent,
    CustomApplOptionsComponent,
    AddlInfoFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatStepperModule,
    MatRadioModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    FlexLayoutModule,
    EstimationModule,
  ],
  exports: [
    FamEstFormComponent,
    CustomDetailsFormComponent,
    CustomOptionsFormComponent,
    FamEstConfirmComponent,
  ]
})
export class FamEstFormModule { }
