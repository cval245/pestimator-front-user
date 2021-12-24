import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FamEstDetailComponent} from "./fam-est-detail/fam-est-detail.component";

const routes: Routes = [
  {
    path: '', component: FamEstDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstimationsDetailPageRoutingModule { }
