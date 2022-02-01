import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FeaturesDemonstrationComponent} from "./features-demonstration/features-demonstration.component";
import {PricingComponent} from "./pricing/pricing.component";
import {ExampleReportComponent} from "./example-report/example-report.component";
import {AdvertisingOneComponent} from "./advertising-one/advertising-one.component";

const routes: Routes = [
  {path: 'features', component: FeaturesDemonstrationComponent},
  {path: 'pricing', component: PricingComponent},
  {path: 'patent-cost-estimator', component: AdvertisingOneComponent},
  {path: 'example-report', component: ExampleReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentFreeRoutingModule { }
