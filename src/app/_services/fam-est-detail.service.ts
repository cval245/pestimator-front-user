import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {FamEstDetail} from '../_models/FamEstDetail.model';
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FamEstDetailService extends EntityCollectionServiceBase<FamEstDetail>{
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('FamEstDetail', serviceElementsFactory)
    }

  getWithQueryByFamEstFormDataUDNUnlessLoaded(udn: number): Observable<FamEstDetail[]> {

    return this.entities$.pipe(switchMap(x => {
      if (x.length > 0){
        if (x.some(y => y.udn == udn)){
          let z = x.filter(y => y.udn == udn)
          return of(z)
        }
        else{
          return super.getWithQuery('FamEstFormDataUDN=' + udn)
        }
      } else {
        return super.getWithQuery('FamEstFormDataUDN=' + udn)
      }
    }))
  }
}



