import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {path: 'not-found', component: NotFoundComponent},
  {
    path: 'trans-est', //resolve: {isLoggedIn: IsLoggedInResolver},
    loadChildren: () => import('./trans-est/trans-est.module').then(m => m.TransEstModule)
  },
  {
    path: 'estimation', //resolve: {isLoggedIn: IsLoggedInResolver},
    loadChildren: () => import('./estimation/estimation.module').then(m => m.EstimationModule)
  },
  {
    path: 'home', //resolve: {isLoggedIn: IsLoggedInResolver},
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'account', //resolve: {isLoggedIn: IsLoggedInResolver},
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
