import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ImageArticle} from "../_models/ImageArticle.model";

@Injectable({
  providedIn: 'root'
})
export class ImageArticlesService {

  private baseurl = environment.API_URL + 'article-image/'

  constructor(private http: HttpClient) {
  }


  post(article_id: number, image_article: ImageArticle) {
    let url = this.baseurl + 'post/' + article_id
    return this.http.post(url, image_article)
  }

  put(image_article: ImageArticle) {
    let url = this.baseurl + 'put/'
    return this.http.put(url, image_article)
  }

}
