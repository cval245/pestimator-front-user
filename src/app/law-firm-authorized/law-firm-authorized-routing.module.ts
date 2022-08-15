import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LawFeeEntryPageComponent} from "./law-fee-entry-page/law-fee-entry-page.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'law-firm-fee-entry', component: LawFeeEntryPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawFirmAuthorizedRoutingModule {
}
