import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {ArticleImagePosition} from "../_models/ArticleImagePosition.model";

@Injectable({
  providedIn: 'root'
})
export class ArticleImagesPositionService extends EntityCollectionServiceBase<ArticleImagePosition> {
  private full_loaded: boolean = false

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ArticleImagePosition', serviceElementsFactory)
  }

  getAllUnlessAlreadyLoaded(): Observable<ArticleImagePosition[]> {
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
