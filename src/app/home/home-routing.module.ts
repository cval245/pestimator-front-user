import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from '../_guards/logged-in.guard';
import {HomePageComponent} from './home-page/home-page.component';
import {HomeProfileGuard} from "../account/home-profile.guard";

const routes: Routes = [
    {path: 'home', component: HomePageComponent,
     canActivate: [LoggedInGuard, HomeProfileGuard ]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
