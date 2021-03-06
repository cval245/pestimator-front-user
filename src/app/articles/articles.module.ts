import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ArticlesRoutingModule} from './articles-routing.module';
import {ArticleListComponent} from './article-list/article-list.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {MatButtonModule} from "@angular/material/button";
import {ArticleCardComponent} from './article-card/article-card.component';
import {MatCardModule} from "@angular/material/card";
import {QuillModule} from "ngx-quill";


@NgModule({
    declarations: [
        ArticleListComponent,
        ArticleDetailComponent,
        ArticleCardComponent
    ],
    exports: [
        ArticleCardComponent
    ],
    imports: [
      CommonModule,
      ArticlesRoutingModule,
      MatButtonModule,
      MatCardModule,
      QuillModule
    ]
})
export class ArticlesModule { }
