import {Component, OnInit} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ArticleService} from "../../_services/article.service";
import {ActivatedRoute} from "@angular/router";
import {Article} from "../../_models/article.model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  private destroy: Subject<void> = new Subject<void>()
  public article: Article = new Article()
  public image_url: string = ''

  constructor(private articleSer: ArticleService,
              private route: ActivatedRoute,
              private location: Location,
  ) {
  }

  ngOnInit(): void {
    let titleslug = this.route.snapshot.paramMap.get('titleslug')
    this.articleSer.getWithQuery('titleslug=' + titleslug)
      .pipe(takeUntil(this.destroy))
      .subscribe(x => {
        this.article = x[0]
        this.image_url = this.article.image_location
      })
  }


  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }

  back() {
    this.location.back()
  }
}
