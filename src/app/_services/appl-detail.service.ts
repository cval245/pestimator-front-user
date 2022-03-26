import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {ApplDetail} from '../_models/appl-detail.model';
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApplDetailService extends EntityCollectionServiceBase<ApplDetail>{
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('ApplDetail', serviceElementsFactory)
    }

  getWithQueryByFamEstFormDataUDNUnlessLoaded(udn: number): Observable<ApplDetail[]> {
    return this.entities$.pipe(switchMap(x => {
      if (x.length > 0){
        if (x.some(y => y.family_udn == udn)){
          let z = x.filter(y => y.family_udn== udn)
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
