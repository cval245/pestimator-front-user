import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import {FamEstForm, FamEstFormSubmit} from '../_models/FamEstForm.model'

@Injectable({
  providedIn: 'root'
})
export class FamEstFormService extends EntityCollectionServiceBase<FamEstFormSubmit>{

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('FamEstForm', serviceElementsFactory)
    }
}
