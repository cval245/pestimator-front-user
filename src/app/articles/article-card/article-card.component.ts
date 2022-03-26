import {Component, Input, OnInit} from '@angular/core';
import {Article} from 'src/app/_models/article.model';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article: Article = new Article()
  public image_url: string = ''

  constructor() { }

  ngOnInit(): void {
    this.image_url = environment.API_URL+'get-article-image/'+this.article.image_location
  }

}
