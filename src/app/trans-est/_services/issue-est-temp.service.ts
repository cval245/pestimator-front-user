import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IIssueEstTemp } from '../_models/IssueEstTemp.model';

@Injectable({
  providedIn: 'root'
})
export class IssueEstTempService extends EntityCollectionServiceBase<IIssueEstTemp>{
 constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('IssueEstTemp', serviceElementsFactory)
   }

}
