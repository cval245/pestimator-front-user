import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IConditions } from '../_models/Conditions.model';

@Injectable({
  providedIn: 'root'
})
export class ConditionsService extends EntityCollectionServiceBase<IConditions>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Conditions', serviceElementsFactory)
   }
}