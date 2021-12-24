import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Country} from '../_models/Country.model';
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CountryService extends EntityCollectionServiceBase<Country>{

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Country', serviceElementsFactory)
    }

  getAllUnlessAlreadyLoaded(){
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
