import { Injectable } from '@angular/core';
import { ApplType } from '../_models/applType.model';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

@Injectable({
  providedIn: 'root'
})
export class ApplTypeAllService extends EntityCollectionServiceBase<ApplType> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ApplTypeAll', serviceElementsFactory)
  }
}
