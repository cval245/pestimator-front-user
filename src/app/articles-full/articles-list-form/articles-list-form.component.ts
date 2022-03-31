import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Article} from "../../_models/article.model";


@Component({
  selector: 'app-articles-list-form',
  templateUrl: './articles-list-form.component.html',
  styleUrls: ['./articles-list-form.component.scss']
})
export class ArticlesListFormComponent implements OnChanges {

  @Input() article: Article = new Article()
  @Output() formEmit = new EventEmitter()
  @Output() cancelEmit = new EventEmitter()
  public form = this.fb.group({
    id: [0],
    title: [''],
    image_location: [''],
    visible: [false],
    content: [''],
  })

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(): void {
    this.form.setValue({
      id: this.article.id,
      title: this.article.title,
      visible: this.article.visible,
      image_location: this.article.image_location,
      content: this.article.content,
    })
  }

  onSubmit() {
    this.formEmit.emit(this.form.value)
  }

  cancelForm() {
    this.form.reset()
    this.cancelEmit.emit()
  }
}
