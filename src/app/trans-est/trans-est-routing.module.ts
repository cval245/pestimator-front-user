import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from '../_guards/logged-in.guard';
import {EstMainFormComponent} from './est-main-form/est-main-form.component';
import {FormPageComponent} from './form-page/form-page.component';
import {
  DetailedFeeCategoryFormPageComponent
} from "./detailed-fee-category-form-page/detailed-fee-category-form-page.component";

const routes: Routes = [
  {
    path: 'trans-form',
    component: FormPageComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'est-form', component: EstMainFormComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'detailed-fee-category-form', component: DetailedFeeCategoryFormPageComponent,
    canActivate: [LoggedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransEstRoutingModule {
}
