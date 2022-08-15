import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {LawFirmAuthorized} from '../_models/law-firm-authorized';

@Injectable({
  providedIn: 'root'
})
export class LawFirmAuthorizedService extends EntityCollectionServiceBase<LawFirmAuthorized> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('LawFirmAuthorized', serviceElementsFactory)
  }

}
