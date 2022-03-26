import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {FamEstForm, FamEstFormSubmit} from '../_models/FamEstForm.model'
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FamEstFormService extends EntityCollectionServiceBase<FamEstFormSubmit> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('FamEstForm', serviceElementsFactory)
  }

  getWithQueryByFamEstFormDataUDNUnlessLoaded(udn: number): Observable<FamEstFormSubmit[]> {
    return this.entities$.pipe(switchMap(x => {
      if (x.length > 0){
        console.log('y-x', x)
        console.log('y-udn', udn)
        if (x.some(y => y.unique_display_no== udn)){
          let z = x.filter(y => y.unique_display_no== udn)
          return of(z)
        }
        else{
          return super.getWithQuery('UDN=' + udn)
        }
      } else {
        return super.getWithQuery('UDN=' + udn)
      }
    }))
  }
}
