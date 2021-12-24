import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {UserProfileAll} from "../_models/UserProfileAll.model";

@Injectable({
  providedIn: 'root'
})
export class UserProfileAllService extends EntityCollectionServiceBase<UserProfileAll> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('UserProfileAll', serviceElementsFactory)
  }
}

