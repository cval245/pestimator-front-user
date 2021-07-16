import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../_guards/logged-in.guard';
import { EstMainFormComponent } from './est-main-form/est-main-form.component';
import { FormPageComponent } from './form-page/form-page.component';

const routes: Routes = [
    {path: 'trans-form', component: FormPageComponent ,
     canActivate: [LoggedInGuard]},
    {path: 'est-form', component: EstMainFormComponent,
     canActivate: [LoggedInGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransEstRoutingModule { }
