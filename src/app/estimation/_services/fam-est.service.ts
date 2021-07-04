import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';

import { FamEst } from '../_models/FamEst.model';

@Injectable({
  providedIn: 'root'
})
export class FamEstService extends EntityCollectionServiceBase<FamEst>{

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('FamEst', serviceElementsFactory)
    }
}
