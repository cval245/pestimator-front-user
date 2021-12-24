import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {IsStaffLoggedInGuard} from "./_guards/is-staff-logged-in.guard";
import {LoggedInGuard} from "./_guards/logged-in.guard";

const routes: Routes = [
  {path: 'not-found', component: NotFoundComponent},
  {
    path: 'trans-est', //resolve: {isLoggedIn: IsLoggedInResolver},
    loadChildren: () => import('./trans-est/trans-est.module').then(m => m.TransEstModule),
    canActivate:  [IsStaffLoggedInGuard]
  },
  {
    path: 'fam-est-form', //resolve: {isLoggedIn: IsLoggedInResolver},
    loadChildren: () => import('./fam-est-form-page/fam-est-form-page.module').then(m => m.FamEstFormPageModule),
    canActivate:  [LoggedInGuard]
  },
  {
    path: 'estimations/:udn', //resolve: {isLoggedIn: IsLoggedInResolver},
    loadChildren: () => import('./estimations-detail-page/estimations-detail-page.module').then(m => m.EstimationsDetailPageModule),
    canActivate:  [LoggedInGuard]
  },
  {
    path: 'estimations', //resolve: {isLoggedIn: IsLoggedInResolver},
    loadChildren: () => import('./estimations-page/estimations-page.module').then(m => m.EstimationsPageModule),
    canActivate:  [LoggedInGuard]
  },
  {
    path: 'home', //resolve: {isLoggedIn: IsLoggedInResolver},
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate:  [LoggedInGuard]
  },
  {
    path: 'account', //resolve: {isLoggedIn: IsLoggedInResolver},
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate:  [IsStaffLoggedInGuard]
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
