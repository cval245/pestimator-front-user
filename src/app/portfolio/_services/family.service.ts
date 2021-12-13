import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {Family} from '../_models/family.model';

@Injectable({
  providedIn: 'root'
})
export class FamilyService extends EntityCollectionServiceBase<Family>{

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Family', serviceElementsFactory)
    }
}
