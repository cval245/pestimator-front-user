import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {ImageArticle, ImageArticleSubmit} from "../_models/ImageArticle.model";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArticleImagesService extends EntityCollectionServiceBase<ImageArticleSubmit> {
  private full_loaded: boolean = false

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ImageArticle', serviceElementsFactory)
  }

  getAllUnlessAlreadyLoaded(): Observable<ImageArticleSubmit[]> {
    return this.loaded$.pipe(switchMap(x => {
      if (x && this.full_loaded) {
        return this.entities$
      } else {
        this.full_loaded = true
        return this.getAll()
      }
    }))
  }
}
