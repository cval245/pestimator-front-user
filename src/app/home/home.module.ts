import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from './home-page/home-page.component';
import {MatButtonModule} from '@angular/material/button';
import {HomeRoutingModule} from './home-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from "@angular/material/list";
import {EstimationModule} from "../estimation/estimation.module";

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
      EstimationModule,
    ],
})
export class HomeModule {
}
