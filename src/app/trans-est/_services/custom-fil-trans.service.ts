import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { CustomFilTrans } from '../_models/CustomFilTrans.model';

@Injectable({
  providedIn: 'root'
})
export class CustomFilTransService extends EntityCollectionServiceBase<CustomFilTrans> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CustomFilTrans', serviceElementsFactory)
   }
}
