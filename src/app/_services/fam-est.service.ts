import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';

import {FamEst} from '../_models/FamEst.model';
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FamEstService extends EntityCollectionServiceBase<FamEst> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('FamEst', serviceElementsFactory)
  }

  getAllUnlessAlreadyLoaded() {

    return this.loaded$.pipe(switchMap(x => {
      return x ? this.entities$ : this.getAll()
    }))
  }

}
