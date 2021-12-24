import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {CountryAll} from '../_models/CountryAll.model';
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CountryAllService extends EntityCollectionServiceBase<CountryAll>{
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('CountryAll', serviceElementsFactory)
    }

    getAllUnlessAlreadyLoaded(){
      return this.loaded$.pipe(switchMap(x => {
        return x ? this.entities$: this.getAll()
      }))
    }
}

