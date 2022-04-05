import {Component, OnInit} from '@angular/core';
import {combineLatest, Subject} from "rxjs";
import {Article} from "../../_models/article.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {first, switchMap, takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ArticlesFormModalComponent} from "../articles-form-modal/articles-form-modal.component";
import {ArticleFullService} from "../../_services/article-full.service";
import {ArticlesImageUploadService} from "../../_services/articles-image-upload.service";
import {ImageArticlesModalComponent} from "../image-articles-modal/image-articles-modal.component";
import {ImageArticle} from "../../_models/ImageArticle.model";
import {ArticleImagesService} from "../../_services/article-images.service";
import {ArticleImagesUploadService} from "../../_services/article-images-upload.service";
import {ArticleImagesPositionService} from "../../_services/article-images-position.service";
import {ArticleImagePosition} from "../../_models/ArticleImagePosition.model";

@Component({
  selector: 'app-articles-detail',
  templateUrl: './articles-detail.component.html',
  styleUrls: ['./articles-detail.component.scss']
})
export class ArticlesDetailComponent implements OnInit {
  private destroy: Subject<void> = new Subject<void>()
  public article: Article = new Article()
  public displayArticle: Article = new Article()
  public image_url: string = ''
  public html: string = ''
  public articleImages: ImageArticle[] = new Array<ImageArticle>()
  public positions: ArticleImagePosition[] = new Array<ArticleImagePosition>()


  constructor(private articleSer: ArticleFullService,
              private route: ActivatedRoute,
              private location: Location,
              private articleImgUplSer: ArticlesImageUploadService,
              public dialog: MatDialog,
              private router: Router,
              private imgArtSer: ArticleImagesService,
              private articleImagSer: ArticleImagesUploadService,
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

  onSubmit(article: Article) {
    this.destroy.next()
    if (article.id == 0) {
      this.articleSer.add(article).pipe(takeUntil(this.destroy)).subscribe(x => {
        this.article = x
        this.router.navigate(['/articles-full/' + x.slug])
      })
    } else {
      this.articleSer.update(article).pipe(takeUntil(this.destroy)).subscribe(x => {
        this.article = x
        this.router.navigate(['/articles-full/' + x.slug])
      })
    }
  }

  onSubmitArticleImage(articleImage: ImageArticle) {
    this.destroy.next()
    let articleImageSubmit = {...articleImage, image_position: articleImage.image_position.id}
    if (articleImageSubmit.id == 0) {
      this.imgArtSer.add(articleImageSubmit)
        .pipe(takeUntil(this.destroy),
          switchMap(y => {
            return this.articleImagSer.post(articleImageSubmit.image_location, y)
          }))
        .subscribe(x => {
        })
    } else {
      this.imgArtSer.update(articleImageSubmit)
        .pipe(takeUntil(this.destroy),
          switchMap(y => {
            return this.articleImagSer.post(articleImageSubmit.image_location, y)
          })
        ).subscribe(x => {
      })
    }
  }

  openForm() {
    let article = this.article
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

  uploadFile(event: Event) {
    //@ts-ignore
    let file = event.target.files[0]
    this.articleImgUplSer.post(file, this.article).pipe(first(), takeUntil(this.destroy)).subscribe()
  }

  openArticleImageForm(articleImage: ImageArticle) {

    let dialogRef = this.dialog.open(ImageArticlesModalComponent, {
      width: '500px',
      data: {articleImage: articleImage, positions: this.positions}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event == 'save') {
          this.onSubmitArticleImage(result.data)
        }
      }
    })
  }

  addArticleImage() {
    let article_image = new ImageArticle()
    article_image.article = this.article.id
    this.openArticleImageForm(article_image)
  }
}
