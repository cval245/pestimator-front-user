import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {IOAEstTemp} from '../_models/OAEstTemp.model';

@Injectable({
  providedIn: 'root'
})
export class OaEstTempService extends EntityCollectionServiceBase<IOAEstTemp> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('OAEstTemp', serviceElementsFactory)
   }
}
