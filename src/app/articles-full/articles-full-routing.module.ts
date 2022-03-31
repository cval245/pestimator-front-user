import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticlesDetailComponent} from "./articles-detail/articles-detail.component";
import {ArticlesListPageComponent} from "./articles-list-page/articles-list-page.component";

const routes: Routes = [
  {
    path: '', component: ArticlesListPageComponent,
  },
  {
    path: ':titleslug', component: ArticlesDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesFullRoutingModule { }
