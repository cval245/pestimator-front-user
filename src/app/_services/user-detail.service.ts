import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {UserDetail} from "../_models/userDetail.model";

@Injectable({
  providedIn: 'root'
})
export class UserDetailService extends EntityCollectionServiceBase<UserDetail>{
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('UserDetail', serviceElementsFactory)
  }
}

