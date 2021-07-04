import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { EntitySize } from '../_models/entitySize.model';

@Injectable({
  providedIn: 'root'
})
export class EntitySizeService extends EntityCollectionServiceBase<EntitySize>{

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('EntitySize', serviceElementsFactory)
    }
}
