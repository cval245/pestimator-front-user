import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IIssueTrans } from '../_models/IssueTrans.model';

@Injectable({
  providedIn: 'root'
})
export class IssueTransService extends EntityCollectionServiceBase<IIssueTrans>{
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('IssueTrans', serviceElementsFactory)
   }
}
