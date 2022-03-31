import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page/home-page.component';
import {MatButtonModule} from '@angular/material/button';
import {HomeRoutingModule} from './home-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from "@angular/material/list";
import {FamilyEstimateTableModule} from "../family-estimate-table/family-estimate-table.module";
import {ArticlesModule} from "../articles/articles.module";
import {LawFirmModule} from "../law-firm/law-firm.module";

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    HomeRoutingModule,
    MatListModule,
    FamilyEstimateTableModule,
    ArticlesModule,
    LawFirmModule,
  ],
})
export class HomeModule {
}
