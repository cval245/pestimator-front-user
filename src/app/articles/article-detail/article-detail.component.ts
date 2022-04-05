import {Component, OnInit} from '@angular/core';
import {switchMap, takeUntil} from "rxjs/operators";
import {combineLatest, Subject} from "rxjs";
import {ArticleService} from "../../_services/article.service";
import {ActivatedRoute} from "@angular/router";
import {Article} from "../../_models/article.model";
import {Location} from "@angular/common";
import {ArticleImagesPositionService} from "../../_services/article-images-position.service";
import {ArticleImagesService} from "../../_services/article-images.service";
import {ImageArticle} from "../../_models/ImageArticle.model";
import {ArticleImagePosition} from "../../_models/ArticleImagePosition.model";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  private destroy: Subject<void> = new Subject<void>()
  public article: Article = new Article()
  public image_url: string = ''
  public displayArticle: Article = new Article()
  public articleImages: ImageArticle[] = new Array<ImageArticle>()
  public positions: ArticleImagePosition[] = new Array<ArticleImagePosition>()

  constructor(private articleSer: ArticleService,
              private route: ActivatedRoute,
              private location: Location,
              private imgArtSer: ArticleImagesService,
              private positionSer: ArticleImagesPositionService,
  ) {
  }

  ngOnInit(): void {
    let titleslug = this.route.snapshot.paramMap.get('titleslug')!
    this.subs(titleslug).subscribe(([articleImages, positions]) => {
      this.positions = positions
      this.displayArticle = this.article
      this.articleImages = articleImages.map(y => {
        let image_position = this.positions.find(z => z.id == y.image_position)!
        return {...y, image_position: image_position}
      })
      this.articleImages.forEach(y => {
        if (y.image_position.name == 'top-left'
          || y.image_position.name == 'top-right'
          || y.image_position.name == 'top') {
          let img_string = '<img src="' + y.image_location + '" class="' + y.image_position.name + '">'
          let blurb = img_string + this.displayArticle.content
          this.displayArticle = {...this.displayArticle, content: blurb}
        }
        if (y.image_position.name == 'bottom-left'
          || y.image_position.name == 'bottom-right'
          || y.image_position.name == 'bottom') {
          let img_string = '<img src="' + y.image_location + '" class="' + y.image_position.name + '">'
          let blurb = this.displayArticle.content + img_string
          this.displayArticle = {...this.displayArticle, content: blurb}
        }
      })
    })
  }

  subs(titleslug: string) {
    return this.articleSer.getWithQuery('titleslug=' + titleslug)
      .pipe(takeUntil(this.destroy),
        switchMap(x => {
          this.article = x[0]
          this.image_url = this.article.image_location
          return combineLatest([
            this.imgArtSer.getWithQuery('articleid=' + this.article.id),
            this.positionSer.getAllUnlessAlreadyLoaded()
          ])
        }))
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }

  back() {
    this.location.back()
  }
}
