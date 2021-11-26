import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import {IRequestExamEstTemp} from "../_models/RequestExamEstTemp.model";
@Injectable({
  providedIn: 'root'
})
export class RequestExamTempService extends EntityCollectionServiceBase<IRequestExamEstTemp>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('RequestExamEstTemp', serviceElementsFactory)
  }
}
