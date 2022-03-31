import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Article} from "../../_models/article.model";


@Component({
  selector: 'app-articles-form-modal',
  templateUrl: './articles-form-modal.component.html',
  styleUrls: ['./articles-form-modal.component.scss']
})
export class ArticlesFormModalComponent {


  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public article: Article) {
  }


  cancel() {
    this.dialogRef.close({event: 'cancel'})
  }

  submitForm(article: Article) {
    this.dialogRef.close({event: 'save', data: article})
  }
}
