import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ImageArticleSubmit} from "../_models/ImageArticle.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleImagesUploadService {
  private url: string = environment.API_URL + 'article-image/image-post/'

  constructor(private http: HttpClient) {
  }

  post(file: any, imageArticle: ImageArticleSubmit) {
    let full_url = this.url + imageArticle.id
    let file_form = new FormData()
    file_form.append("file", file)
    return this.http.post(full_url, file_form)
  }
}
