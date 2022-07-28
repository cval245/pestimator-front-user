import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {IConditions} from '../_models/Conditions.model';
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConditionsService extends EntityCollectionServiceBase<IConditions> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Conditions', serviceElementsFactory)
  }

  getAllUnlessAlreadyLoaded() {
    return this.loaded$.pipe(switchMap(x => x ? this.entities$ : this.getAll()))
  }
}
