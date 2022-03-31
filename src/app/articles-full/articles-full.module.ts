import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ArticlesFullRoutingModule} from './articles-full-routing.module';
import {ArticlesListPageComponent} from './articles-list-page/articles-list-page.component';
import {ArticlesListFormComponent} from './articles-list-form/articles-list-form.component';
import {ArticlesDetailComponent} from './articles-detail/articles-detail.component';
import {ArticlesCardComponent} from './articles-card/articles-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {FlexModule} from "@angular/flex-layout";
import {ArticlesFormModalComponent} from './articles-form-modal/articles-form-modal.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    ArticlesListPageComponent,
    ArticlesListFormComponent,
    ArticlesDetailComponent,
    ArticlesCardComponent,
    ArticlesFormModalComponent
  ],
  imports: [
    CommonModule,
    ArticlesFullRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    FlexModule
  ]
})
export class ArticlesFullModule { }
