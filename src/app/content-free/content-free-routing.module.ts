import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FeaturesDemonstrationComponent} from "./features-demonstration/features-demonstration.component";
import {PricingComponent} from "./pricing/pricing.component";

const routes: Routes = [
  { path: 'features', component: FeaturesDemonstrationComponent },
  { path: 'pricing', component: PricingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentFreeRoutingModule { }
