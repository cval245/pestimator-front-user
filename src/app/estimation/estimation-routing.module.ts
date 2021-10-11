import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FamilyEstimateMainComponent} from './family-estimate-main/family-estimate-main.component';
import {LoggedInGuard} from '../_guards/logged-in.guard';
import {FamEstDetailComponent} from './fam-est-detail/fam-est-detail.component';
import {FamEstFormPageComponent} from './fam-est-form-page/fam-est-form-page.component';
// import { SubmitFamEstFormComponent } from './submit-fam-est-form/submit-fam-est-form.component';

const routes: Routes = [
  {
    path: 'estimations', component: FamilyEstimateMainComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'estimations/:udn', component: FamEstDetailComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'fam-est-form', component: FamEstFormPageComponent,
    canActivate: [LoggedInGuard]
  },
  // {path: 'submit-form', component: SubmitFamEstFormComponent,
  //  canActivate: [LoggedInGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstimationRoutingModule { }
