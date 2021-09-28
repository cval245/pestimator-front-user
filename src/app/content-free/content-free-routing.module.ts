import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FeaturesDemonstrationComponent} from "./features-demonstration/features-demonstration.component";

const routes: Routes = [
  { path: 'features', component: FeaturesDemonstrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentFreeRoutingModule { }
