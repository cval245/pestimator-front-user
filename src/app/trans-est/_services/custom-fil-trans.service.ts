import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {ICustomFilTrans} from '../_models/CustomFilTrans.model';

@Injectable({
  providedIn: 'root'
})
export class CustomFilTransService extends EntityCollectionServiceBase<ICustomFilTrans> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CustomFilTrans', serviceElementsFactory)
   }
}
