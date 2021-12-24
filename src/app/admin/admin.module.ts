import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './main-page/main-page.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {GridUserAllComponent} from './grid-user-all/grid-user-all.component';
import {BtnCellRendererComponent} from './btn-cell-renderer/btn-cell-renderer.component';
import {UserDetailPageComponent} from './user-detail-page/user-detail-page.component';
import {GridFamEstUserComponent} from './grid-fam-est-user/grid-fam-est-user.component';
import {BtnFamEstCellRendererComponent} from './btn-fam-est-cell-renderer/btn-fam-est-cell-renderer.component';
import {FamEstDetailsComponent} from './fam-est-details/fam-est-details.component';
import {EstimationModule} from "../estimation/estimation.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AgGridModule} from "@ag-grid-community/angular";

// import {AgGridModule} from "@ag-grid-community/angular";


@NgModule({
  declarations: [
    MainPageComponent,
    GridUserAllComponent,
    BtnCellRendererComponent,
    UserDetailPageComponent,
    GridFamEstUserComponent,
    BtnFamEstCellRendererComponent,
    FamEstDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AgGridModule.withComponents([BtnCellRendererComponent, BtnFamEstCellRendererComponent]),
    EstimationModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
