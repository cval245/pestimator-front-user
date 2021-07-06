import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { ICountryOANum } from '../_models/CountryOANum.model';

@Injectable({
  providedIn: 'root'
})
export class CountryOanumService extends EntityCollectionServiceBase<ICountryOANum>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('CountryOANum', serviceElementsFactory)
   }

}
