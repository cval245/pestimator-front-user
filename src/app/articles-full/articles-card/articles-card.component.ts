import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../_models/article.model";
import {environment} from "../../../environments/environment";

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
    this.image_url = environment.API_URL+'get-article-image/'+this.article.image_location
  }
}
