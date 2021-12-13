import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {IRequestExamTrans} from "../_models/RequestExamTrans.model";

@Injectable({
  providedIn: 'root'
})
export class RequestExamTransService extends EntityCollectionServiceBase<IRequestExamTrans>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('RequestExamTrans', serviceElementsFactory)
  }
}
