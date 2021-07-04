import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { LawFirmTableComponent } from './law-firm-table/law-firm-table.component';
import { LawFirmRoutingModule } from './law-firm-routing.module';


@NgModule({
    declarations: [
        LawFirmTableComponent,
        MainPageComponent,
    ],
    imports: [
        CommonModule,
    ]
})
export class LawFirmModule { }
