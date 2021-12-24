import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {ApplDetail} from '../_models/appl-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ApplDetailService extends EntityCollectionServiceBase<ApplDetail>{
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('ApplDetail', serviceElementsFactory)
    }
}
