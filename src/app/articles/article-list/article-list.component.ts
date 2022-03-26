import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../_services/article.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Article} from "../../_models/article.model";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  private destroy: Subject<void> = new Subject<void>()
  public articles: Article[] = new Array<Article>()

  constructor(private articleSer: ArticleService) { }

  ngOnInit(): void {
    this.articleSer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.destroy))
      .subscribe(x => {
        this.articles = x
      })
  }

  ngOnDestroy(): void{
    this.destroy.next()
    this.destroy.complete()
  }
}
