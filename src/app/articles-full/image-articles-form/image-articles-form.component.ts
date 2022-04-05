import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {ImageArticle} from "../../_models/ImageArticle.model";
import {FormBuilder} from "@angular/forms";
import {ArticleImagePosition} from "../../_models/ArticleImagePosition.model";

@Component({
  selector: 'app-image-articles-form',
  templateUrl: './image-articles-form.component.html',
  styleUrls: ['./image-articles-form.component.scss']
})
export class ImageArticlesFormComponent implements OnChanges {

  @Input() articleImage: ImageArticle = new ImageArticle()
  @Input() positions: ArticleImagePosition[] = new Array<ArticleImagePosition>()
  @Output() formEmit = new EventEmitter()
  @Output() cancelEmit = new EventEmitter()
  public form = this.fb.group({
    id: [0],
    image_position: [''],
    image_location: [''],
    article: [0],
  })

  comparePosition(c_one: ArticleImagePosition, c_two: ArticleImagePosition) {
    return c_one.id === c_two.id;
  }

  constructor(private fb: FormBuilder) {
  }


  ngOnChanges(): void {
    this.form.setValue({
      id: this.articleImage.id,
      image_position: this.articleImage.image_position,
      image_location: this.articleImage.image_location,
      article: this.articleImage.article,
    })
  }

  onSubmit() {
    this.formEmit.emit(this.form.value)
  }

  cancelForm() {
    this.form.reset()
    this.cancelEmit.emit()
  }

  uploadFile(event: Event) {
    //@ts-ignore
    let file = event.target.files[0]
    this.form.patchValue({image_location: file})
  }
}
