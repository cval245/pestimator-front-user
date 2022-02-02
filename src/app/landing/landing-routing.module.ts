import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {LandingGuard} from "../_guards/landing.guard";
import {HomeGuard} from "../_guards/home.guard";

const routes: Routes = [
  {path: '', component: LandingPageComponent, canActivate: [LandingGuard, HomeGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {
}
