import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {HomeProfileGuard} from "../_guards/home-profile.guard";

const routes: Routes = [
    {path: '', component: HomePageComponent,
     canActivate: [ HomeProfileGuard ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
