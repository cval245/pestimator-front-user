import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../_models/article.model";

@Component({
  selector: 'app-articles-card',
  templateUrl: './articles-card.component.html',
  styleUrls: ['./articles-card.component.scss']
})
export class ArticlesCardComponent implements OnInit {

  @Input() article: Article = new Article()
  public image_url: string = ''
  constructor() { }

  ngOnInit(): void {
    this.image_url = this.article.image_location
  }
}
