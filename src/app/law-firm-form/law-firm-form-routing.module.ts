import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LawFirmListComponent} from "./law-firm-list/law-firm-list.component";
import {LawFirmDetailComponent} from "./law-firm-detail/law-firm-detail.component";

const routes: Routes = [
  {
    path: '', component: LawFirmListComponent,
  },
  {
    path: ':nameslug', component: LawFirmDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawFirmFormRoutingModule {
}
