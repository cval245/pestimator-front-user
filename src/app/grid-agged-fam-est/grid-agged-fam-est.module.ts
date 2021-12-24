import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridAggedFamEstComponent} from "./grid-agged-fam-est/grid-agged-fam-est.component";
import {AgGridModule} from "@ag-grid-community/angular";


@NgModule({
  declarations: [GridAggedFamEstComponent],
  imports: [
    CommonModule,
    AgGridModule,
  ],
  exports: [GridAggedFamEstComponent]
})
export class GridAggedFamEstModule { }
