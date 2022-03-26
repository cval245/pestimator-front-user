import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {LandingGuard} from "../_guards/landing.guard";
import {HomeGuard} from "../_guards/home.guard";
import {EstimatePatentCostsComponent} from "./estimate-patent-costs/estimate-patent-costs.component";

const routes: Routes = [
  {path: '', component: LandingPageComponent, canActivate: [LandingGuard, HomeGuard]},
  {path: 'estimate-patent-costs', component: EstimatePatentCostsComponent,
    canActivate: [LandingGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {
}
