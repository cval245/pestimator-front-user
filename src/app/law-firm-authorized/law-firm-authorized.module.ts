import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {LawFirmAuthorizedRoutingModule} from "./law-firm-authorized-routing.module";
import {LawFirmFormModule} from "../law-firm-form/law-firm-form.module";
import {LawFeeEntryPageComponent} from './law-fee-entry-page/law-fee-entry-page.component';
import {LawFirmFeeGridComponent} from './law-firm-fee-grid/law-firm-fee-grid.component';
import {AgGridModule} from "@ag-grid-community/angular";
import {CurrencySelectorComponent} from './currency-selector/currency-selector.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HomeComponent,
    LawFeeEntryPageComponent,
    LawFirmFeeGridComponent,
    CurrencySelectorComponent
  ],
  imports: [
    CommonModule, LawFirmAuthorizedRoutingModule, LawFirmFormModule, AgGridModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule
  ]
})
export class LawFirmAuthorizedModule {
}
