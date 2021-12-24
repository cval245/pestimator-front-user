import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FamEstFormPageComponent} from "./fam-est-form-page/fam-est-form-page.component";

const routes: Routes = [
  {
    path: '', component: FamEstFormPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamEstFormPageRoutingModule { }
