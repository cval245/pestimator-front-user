import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';

import {switchMap} from "rxjs/operators";
import {FamEstFree} from "../_models/FamEstFree.model";

@Injectable({
  providedIn: 'root'
})
export class FamEstGuestService extends EntityCollectionServiceBase<FamEstFree> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('FamEstGuest', serviceElementsFactory)
  }

  getAllUnlessAlreadyLoaded() {

    return this.loaded$.pipe(switchMap(x => {
      return x ? this.entities$ : this.getAll()
    }))
  }

}
