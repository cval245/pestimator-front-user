import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {FamilyAll} from "../_models/FamilyAll.model";

@Injectable({
  providedIn: 'root'
})
export class FamilyAllService extends EntityCollectionServiceBase<FamilyAll> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('FamilyAll', serviceElementsFactory)
  }
}


