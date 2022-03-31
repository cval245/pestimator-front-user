import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Article} from "../_models/article.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ArticlesImageUploadService {

  private url: string = environment.API_URL + 'post-article-image/'
  constructor(private http: HttpClient) {

  }

  post(file: any, article: Article){
    let full_url = this.url + article.id
    let file_form = new FormData()
    file_form.append("file", file)
    return this.http.post(full_url, file_form)
  }

}
