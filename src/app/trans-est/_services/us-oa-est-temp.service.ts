import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {IUSOAEstTempSubmit} from "../_models/IUSOAEstTemp";

@Injectable({
  providedIn: 'root'
})
export class UsOaEstTempService extends EntityCollectionServiceBase<IUSOAEstTempSubmit> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('USOAEstTemp', serviceElementsFactory)
  }
}
