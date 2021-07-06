import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IAllowEstTemp } from '../_models/AllowEstTemp.model';

@Injectable({
  providedIn: 'root'
})
export class AllowEstTempService extends EntityCollectionServiceBase<IAllowEstTemp>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('AllowEstTemp', serviceElementsFactory)
   }
}
