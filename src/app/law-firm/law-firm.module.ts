import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './main-page/main-page.component';
import {LawFirmTableComponent} from './law-firm-table/law-firm-table.component';
import {LawFirmRoutingModule} from "./law-firm-routing.module";
import {LawFirmCardComponent} from './law-firm-card/law-firm-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatSelectModule} from "@angular/material/select";
import {LawFirmDetailComponent} from './law-firm-detail/law-firm-detail.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LawFirmTableComponent,
    MainPageComponent,
    LawFirmCardComponent,
    LawFirmDetailComponent,
  ],
    imports: [
        CommonModule,
        LawFirmRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class LawFirmModule {
}
