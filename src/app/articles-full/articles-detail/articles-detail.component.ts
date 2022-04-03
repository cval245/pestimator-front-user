import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Article} from "../../_models/article.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {first, takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ArticlesFormModalComponent} from "../articles-form-modal/articles-form-modal.component";
import {ArticleFullService} from "../../_services/article-full.service";
import {ArticlesImageUploadService} from "../../_services/articles-image-upload.service";

@Component({
  selector: 'app-articles-detail',
  templateUrl: './articles-detail.component.html',
  styleUrls: ['./articles-detail.component.scss']
})
export class ArticlesDetailComponent implements OnInit {
  private destroy: Subject<void> = new Subject<void>()
  public article: Article = new Article()
  public image_url: string = ''
  public html: string = ''


  constructor(private articleSer: ArticleFullService,
              private route: ActivatedRoute,
              private location: Location,
              private articleImgUplSer: ArticlesImageUploadService,
              public dialog: MatDialog,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    let titleslug = this.route.snapshot.paramMap.get('titleslug')!

      this.subs(titleslug).subscribe(x => {
        this.article = x[0]
        this.image_url = this.article.image_location
      })
  }

  subs(titleslug: string) {
    return this.articleSer.getWithQuery('titleslug=' + titleslug)
      .pipe(takeUntil(this.destroy))
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
    console.log(article)
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
}
