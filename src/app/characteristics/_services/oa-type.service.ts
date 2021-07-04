import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { OAType } from '../_models/oaType.model';

@Injectable({
  providedIn: 'root'
})
export class OaTypeService extends EntityCollectionServiceBase<OAType>{

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('OAType', serviceElementsFactory)
    }
}
