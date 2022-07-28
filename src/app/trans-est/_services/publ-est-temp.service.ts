import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {IPublEstTempSubmit} from '../_models/PublEstTemp.model';

@Injectable({
  providedIn: 'root'
})
export class PublEstTempService extends EntityCollectionServiceBase<IPublEstTempSubmit> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('PublEstTemp', serviceElementsFactory)
  }

}
