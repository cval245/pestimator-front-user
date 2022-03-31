import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LawFirmFormPageComponent} from './law-firm-form-page/law-firm-form-page.component';
import {LawFirmFormComponent} from './law-firm-form/law-firm-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatStepperModule} from "@angular/material/stepper";
import {FlexModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {LawFirmFormRoutingModule} from "./law-firm-form-routing.module";
import {LawFirmListComponent} from './law-firm-list/law-firm-list.component';
import {LawFirmModalComponent} from './law-firm-modal/law-firm-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {LawFirmCardComponent} from './law-firm-card/law-firm-card.component';
import {MatCardModule} from "@angular/material/card";
import {LawFirmDetailComponent} from './law-firm-detail/law-firm-detail.component';


@NgModule({
  declarations: [
    LawFirmFormPageComponent,
    LawFirmFormComponent,
    LawFirmListComponent,
    LawFirmModalComponent,
    LawFirmCardComponent,
    LawFirmDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDialogModule,
    FlexModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    LawFirmFormRoutingModule,
    MatCardModule,
  ]
})
export class LawFirmFormModule { }
