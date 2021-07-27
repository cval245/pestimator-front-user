import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {IUSOAEstTemp} from "../_models/IUSOAEstTemp";

@Injectable({
  providedIn: 'root'
})
export class UsOaEstTempService extends EntityCollectionServiceBase<IUSOAEstTemp> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('USOAEstTemp', serviceElementsFactory)
  }
}
