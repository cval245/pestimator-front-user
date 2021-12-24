import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridCountryEstDetailComponent} from "./grid-country-est-detail/grid-country-est-detail.component";
import {AgGridModule} from "@ag-grid-community/angular";


@NgModule({
  declarations: [GridCountryEstDetailComponent],
  imports: [
    CommonModule,
    AgGridModule
  ],
  exports: [
    GridCountryEstDetailComponent
  ]
})
export class GridCountryEstDetailModule { }
