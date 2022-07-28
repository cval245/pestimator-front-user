import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {FamEstDetTot} from "../_models/FamEstDetTot.model";
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FamEstDetTotService extends EntityCollectionServiceBase<FamEstDetTot>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('FamEstDetTot', serviceElementsFactory)
  }

  getWithQueryByFamEstFormDataUDNUnlessLoaded(udn: number): Observable<FamEstDetTot[]> {
    return this.entities$.pipe(switchMap(x => {
      if (x.length > 0){
        if (x.some(y => y.family_udn == udn)){
          let z = x.filter(y => y.family_udn == udn)
          return of(z)
        }
        else{
          return super.getWithQuery('familyUDN=' + udn)
        }
      } else {
        return super.getWithQuery('familyUDN=' + udn)
      }
    }))
  }

}
