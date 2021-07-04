import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../_guards/logged-in.guard';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
    {path: 'home', component: HomePageComponent,
     canActivate: [LoggedInGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
