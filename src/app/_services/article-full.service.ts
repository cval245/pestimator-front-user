import {Injectable} from '@angular/core';
import {EntityActionOptions, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {Article} from "../_models/article.model";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArticleFullService extends EntityCollectionServiceBase<Article> {
  private full_loaded: boolean = false

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ArticleFull', serviceElementsFactory)
  }


  update(entity: Partial<Article>, options?: EntityActionOptions): Observable<Article> {
    return super.update(entity, options);
  }

  getAllUnlessAlreadyLoaded(): Observable<Article[]> {
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
