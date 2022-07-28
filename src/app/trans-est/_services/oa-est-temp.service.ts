import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {IOAEstTempSubmit} from '../_models/OAEstTemp.model';

@Injectable({
  providedIn: 'root'
})
export class OaEstTempService extends EntityCollectionServiceBase<IOAEstTempSubmit> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('OAEstTemp', serviceElementsFactory)
  }
}
