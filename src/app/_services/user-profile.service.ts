import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {UserProfile} from '../_models/userProfile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService extends EntityCollectionServiceBase<UserProfile>{
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('UserProfile', serviceElementsFactory)
    }
}
