import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormPageComponent} from './form-page/form-page.component';
import {TransFormTableComponent} from './trans-form-table/trans-form-table.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {GenTransComponent} from './gen-trans/gen-trans.component';
import {OaNumFormComponent} from './oa-num-form/oa-num-form.component';
import {EstMainFormComponent} from './est-main-form/est-main-form.component';
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {TransEstRoutingModule} from "./trans-est-routing.module";
import {ApplTypeFormComponent} from './appl-type-form/appl-type-form.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AgGridModule} from "@ag-grid-community/angular";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {EstTemplateGridV2Component} from './est-template-grid-v2/est-template-grid-v2.component';
import {ConditionRendererComponent} from './condition-renderer/condition-renderer.component';
import {MatChipsModule} from "@angular/material/chips";
import {ConditionsFormComponent} from './conditions-form/conditions-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {OverlayModule} from "@angular/cdk/overlay";
import {PortalModule} from "@angular/cdk/portal";
import {EstTemplateGridUSOAComponent} from "./est-template-grid-us-oa/est-template-grid-us-oa.component";


@NgModule({
  declarations: [
    FormPageComponent,
    TransFormTableComponent,
    GenTransComponent,
    OaNumFormComponent,
    EstMainFormComponent,
    ApplTypeFormComponent,
    EstTemplateGridV2Component,
    EstTemplateGridUSOAComponent,
    ConditionRendererComponent,
    ConditionsFormComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TransEstRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatCheckboxModule,
    MatDialogModule,
    AgGridModule.withComponents([ConditionRendererComponent]),
    MatChipsModule,
    MatDividerModule,
    OverlayModule,
    PortalModule
  ]
})
export class TransEstModule { }
