import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IAllowTrans } from '../_models/AllowTrans.model';

@Injectable({
  providedIn: 'root'
})
export class AllowTransService extends EntityCollectionServiceBase<IAllowTrans>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
      super('AllowTrans', serviceElementsFactory)
   }
}
