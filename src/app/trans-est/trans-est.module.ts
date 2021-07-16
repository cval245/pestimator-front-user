import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPageComponent } from './form-page/form-page.component';
import { TransFormTableComponent } from './trans-form-table/trans-form-table.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { GenTransComponent } from './gen-trans/gen-trans.component';
import { OaNumFormComponent } from './oa-num-form/oa-num-form.component';
import { EstMainFormComponent } from './est-main-form/est-main-form.component';
import { EstFormComponent } from './est-form/est-form.component';



@NgModule({
  declarations: [
    FormPageComponent,
    TransFormTableComponent,
    GenTransComponent,
    OaNumFormComponent,
    EstMainFormComponent,
    EstFormComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    FlexLayoutModule,
    MatSelectModule,
    MatIconModule,
  ]
})
export class TransEstModule { }
