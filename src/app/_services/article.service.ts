import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {Article} from "../_models/article.model";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends EntityCollectionServiceBase<Article>{
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Article', serviceElementsFactory)
  }
  getAllUnlessAlreadyLoaded(): Observable<Article[]> {
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
