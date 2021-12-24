import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FamilyEstimateMainComponent} from "./family-estimate-main/family-estimate-main.component";

const routes: Routes = [
  {
    path: '', component: FamilyEstimateMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstimationsPageRoutingModule { }
