import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {IRequestExamEstTempSubmit} from "../_models/RequestExamEstTemp.model";

@Injectable({
  providedIn: 'root'
})
export class RequestExamTempService extends EntityCollectionServiceBase<IRequestExamEstTempSubmit> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('RequestExamEstTemp', serviceElementsFactory)
  }
}
