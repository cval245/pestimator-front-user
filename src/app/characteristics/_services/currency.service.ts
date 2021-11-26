import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';

import {Injectable} from '@angular/core';
import {Currency} from "../_models/Currency.model";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends EntityCollectionServiceBase<Currency>{
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Currency', serviceElementsFactory)
  }
  getAllUnlessAlreadyLoaded(){
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
