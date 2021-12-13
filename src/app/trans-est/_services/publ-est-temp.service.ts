import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {IPublEstTemp} from '../_models/PublEstTemp.model';

@Injectable({
  providedIn: 'root'
})
export class PublEstTempService extends EntityCollectionServiceBase<IPublEstTemp>{
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('PublEstTemp', serviceElementsFactory)
   }

}
