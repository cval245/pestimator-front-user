import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from '../_guards/logged-in.guard';
import {MainPageComponent} from './main-page/main-page.component';

const routes: Routes = [
    {path: 'law-firms', component: MainPageComponent,
     canActivate: [LoggedInGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LawFirmRoutingModule { }
