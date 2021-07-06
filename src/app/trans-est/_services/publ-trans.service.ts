import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IPublTrans } from '../_models/PublTrans.model';

@Injectable({
  providedIn: 'root'
})
export class PublTransService extends EntityCollectionServiceBase<IPublTrans>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('PublTrans', serviceElementsFactory)
   }
}
