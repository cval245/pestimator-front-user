import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../_guards/logged-in.guard';
import { FormPageComponent } from './form-page/form-page.component';


const routes: Routes = [
    {path: 'trans-form', component: FormPageComponent ,
     canActivate: [LoggedInGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransEstRoutingModule { }
