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
  ) {
  }

  ngOnInit(): void {

    let titleslug = this.route.snapshot.paramMap.get('titleslug')!
    this.subs(titleslug).subscribe(([articleImages]) => {
      this.displayArticle = this.article
      this.articleImages = articleImages
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
    let articleImageSubmit = {...articleImage}
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

  imageHandler(this: any) {
    const tooltip = this.quill.theme.tooltip;
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;
    tooltip.save = function (this: any) {
      const range = this.quill.getSelection(true);
      const value = this.textbox.value;
      if (value) {
        this.quill.insertEmbed(range.index, 'image', value, 'user');
      }
    };
    // Called on hide and save.
    tooltip.hide = function (this: any) {
      tooltip.save = originalSave;
      tooltip.hide = originalHide;
      tooltip.hide();
    };
    tooltip.edit('image');
    tooltip.textbox.placeholder = "Embed URL";
  }

  cancelForm($event: any) {

  }

  submitForm(event: any) {
    this.onSubmit(event)
  }
}
