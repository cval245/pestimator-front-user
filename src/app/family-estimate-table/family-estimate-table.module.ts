import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FamilyEstimateTableComponent} from "./family-estimate-table/family-estimate-table.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    FamilyEstimateTableComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
  ],
  exports: [
    FamilyEstimateTableComponent
  ],
})
export class FamilyEstimateTableModule { }
