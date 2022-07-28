import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {IIssueEstTempSubmit} from '../_models/IssueEstTemp.model';

@Injectable({
  providedIn: 'root'
})
export class IssueEstTempService extends EntityCollectionServiceBase<IIssueEstTempSubmit> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('IssueEstTemp', serviceElementsFactory)
  }

}
