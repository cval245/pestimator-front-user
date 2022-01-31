import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {Family} from '../_models/family.model';
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FamilyService extends EntityCollectionServiceBase<Family> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Family', serviceElementsFactory)
  }

  getAllUnlessAlreadLoaded() {
    return this.loaded$.pipe(switchMap(x => {
      return x ? this.entities$ : this.getAll()
    }))
  }
}
