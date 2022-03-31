import {Component, OnInit} from '@angular/core';
import {ArticleFullService} from "../../_services/article-full.service";
import {Subject} from "rxjs";
import {Article} from "../../_models/article.model";
import {takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ArticlesFormModalComponent} from "../articles-form-modal/articles-form-modal.component";

@Component({
  selector: 'app-articles-list-page',
  templateUrl: './articles-list-page.component.html',
  styleUrls: ['./articles-list-page.component.scss']
})
export class ArticlesListPageComponent implements OnInit {

  private destroy: Subject<void> = new Subject<void>()
  public articles: Article[] = new Array<Article>()

  constructor(private articleFullSer: ArticleFullService,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.articleFullSer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.destroy))
      .subscribe(x => {
        this.articles = x
      })
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }


  newArticle() {
    let article = new Article()

    let dialogRef = this.dialog.open(ArticlesFormModalComponent, {
      width: '500px',
      data: article
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event == 'save') {
          this.onSubmit(result.data)
        }
      }
    })
  }

  onSubmit(article: Article) {
    if (article.id == 0) {
      this.articleFullSer.add(article)
    } else {
      this.articleFullSer.update(article)
    }
  }
}
