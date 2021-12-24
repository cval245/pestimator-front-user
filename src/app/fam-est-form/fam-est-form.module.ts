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


@NgModule({
  declarations: [
    FamEstFormComponent,
    CustomDetailsFormComponent,
    CustomOptionsFormComponent,
    FamEstConfirmComponent
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
