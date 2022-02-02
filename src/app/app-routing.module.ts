import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {IsStaffLoggedInGuard} from "./_guards/is-staff-logged-in.guard";
import {LoggedInGuard} from "./_guards/logged-in.guard";
import {CustomPreloadingStrategyService} from "./_services/custom-preloading-strategy.service";
import {LandingGuard} from "./_guards/landing.guard";

const routes: Routes = [
  {
    path: 'not-found',
    component: NotFoundComponent,
    canActivate: [LandingGuard]
  },
  {
    path: 'trans-est',
    loadChildren: () => import('./trans-est/trans-est.module').then(m => m.TransEstModule),
    canActivate: [IsStaffLoggedInGuard, LandingGuard],
    data: {preload: true}
  },
  {
    path: 'fam-est-form',
    loadChildren: () => import('./fam-est-form-page/fam-est-form-page.module').then(m => m.FamEstFormPageModule),
    canActivate: [LoggedInGuard, LandingGuard],
    data: {preload: true}
  },
  {
    path: 'estimations/:udn',
    loadChildren: () => import('./estimations-detail-page/estimations-detail-page.module').then(m => m.EstimationsDetailPageModule),
    canActivate: [LoggedInGuard, LandingGuard],
    data: {preload: true}
  },
  {
    path: 'estimations',
    loadChildren: () => import('./estimations-page/estimations-page.module').then(m => m.EstimationsPageModule),
    canActivate: [LoggedInGuard, LandingGuard],
    data: {preload: true}
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [LoggedInGuard, LandingGuard],
    data: {preload: true}
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    canActivate: [LandingGuard],
    data: {preload: true}
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [IsStaffLoggedInGuard, LandingGuard],
    data: {preload: false}
  },
  {path: '**', component: NotFoundComponent, canActivate: [LandingGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    preloadingStrategy: CustomPreloadingStrategyService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
