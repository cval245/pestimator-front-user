import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from '../_guards/logged-in.guard';
import {MainPageComponent} from "./main-page/main-page.component";
import {UserDetailPageComponent} from "./user-detail-page/user-detail-page.component";
import {FamEstDetailsComponent} from "./fam-est-details/fam-est-details.component";

const routes: Routes = [
  {path: 'main', component: MainPageComponent,
    canActivate: [LoggedInGuard]},
  {path: 'user-detail/:id', component: UserDetailPageComponent,
    canActivate: [LoggedInGuard]},
  {path: 'family-detail/:id', component: FamEstDetailsComponent,
    canActivate: [LoggedInGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
