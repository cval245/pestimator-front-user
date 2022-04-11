import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Article} from "../../_models/article.model";
import {defaultModules, QuillModules} from "ngx-quill";


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
    abstract: [''],
  })
  public quillModules: QuillModules = {
    toolbar: {
      container: defaultModules.toolbar,
      handlers: {
        image: this.imageHandler
      }
    }
  };

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(): void {
    this.form.setValue({
      id: this.article.id,
      title: this.article.title,
      visible: this.article.visible,
      image_location: this.article.image_location,
      content: this.article.content,
      abstract: this.article.abstract,
    })
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

  onSubmit() {
    this.formEmit.emit(this.form.value)
  }

  cancelForm() {
    this.form.reset()
    this.cancelEmit.emit()
  }

}
