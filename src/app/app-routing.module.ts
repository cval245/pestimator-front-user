import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
    {path: 'not-found', component: NotFoundComponent},
    {path: 'trans-est',
    loadChildren: () => import('./trans-est/trans-est.module').then(m => m.TransEstModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
