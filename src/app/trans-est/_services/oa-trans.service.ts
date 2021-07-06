import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IOATrans } from '../_models/OATrans.model';

@Injectable({
  providedIn: 'root'
})
export class OaTransService extends EntityCollectionServiceBase<IOATrans>{
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('OATrans', serviceElementsFactory)
   }
}
