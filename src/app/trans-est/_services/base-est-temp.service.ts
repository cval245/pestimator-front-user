import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IBaseEstTemp } from '../_models/BaseEstTemp.model';

@Injectable({
  providedIn: 'root'
})
export class BaseEstTempService extends EntityCollectionServiceBase<IBaseEstTemp>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('BaseEstTemp', serviceElementsFactory)
   }
}
