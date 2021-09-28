import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeaturesDemonstrationComponent} from './features-demonstration/features-demonstration.component';
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    FeaturesDemonstrationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class ContentFreeModule { }
