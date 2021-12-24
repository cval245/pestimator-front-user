import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {FamEstDetTot} from "../_models/FamEstDetTot.model";

@Injectable({
  providedIn: 'root'
})
export class FamEstDetTotService extends EntityCollectionServiceBase<FamEstDetTot>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('FamEstDetTot', serviceElementsFactory)
  }
}
