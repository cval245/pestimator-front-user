import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {IAllowEstTempSubmit} from '../_models/AllowEstTemp.model';

@Injectable({
  providedIn: 'root'
})
export class AllowEstTempService extends EntityCollectionServiceBase<IAllowEstTempSubmit> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('AllowEstTemp', serviceElementsFactory)
  }
}
