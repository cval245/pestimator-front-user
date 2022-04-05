import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Article} from "../../_models/article.model";
import {ImageArticle} from "../../_models/ImageArticle.model";
import {ArticleImagePosition} from "../../_models/ArticleImagePosition.model";

@Component({
  selector: 'app-image-articles-modal',
  templateUrl: './image-articles-modal.component.html',
  styleUrls: ['./image-articles-modal.component.scss']
})
export class ImageArticlesModalComponent implements OnInit {
  public articleImage: ImageArticle = new ImageArticle()
  public positions: ArticleImagePosition[] = new Array<ArticleImagePosition>()

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: { articleImage: ImageArticle, positions: ArticleImagePosition[] }) {
  }

  ngOnInit(): void {
    this.articleImage = this.data.articleImage
    this.positions = this.data.positions
  }


  cancel() {
    this.dialogRef.close({event: 'cancel'})
  }

  submitForm(article: Article) {
    this.dialogRef.close({event: 'save', data: article})
  }


}
