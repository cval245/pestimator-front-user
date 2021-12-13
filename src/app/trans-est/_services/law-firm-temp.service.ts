import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {ILawFirmEstTemp} from '../_models/LawFirmEstTemp.model';

@Injectable({
  providedIn: 'root'
})
export class LawFirmTempService extends EntityCollectionServiceBase<ILawFirmEstTemp> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('LawFirmEstTemp', serviceElementsFactory)
   }
}
