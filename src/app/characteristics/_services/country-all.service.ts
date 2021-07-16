import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { CountryAll } from '../_models/CountryAll.model';

@Injectable({
  providedIn: 'root'
})
export class CountryAllService extends EntityCollectionServiceBase<CountryAll>{
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('CountryAll', serviceElementsFactory)
    }
}

