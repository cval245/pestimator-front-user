import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {Family} from '../_models/family.model';
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FamilyService extends EntityCollectionServiceBase<Family> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Family', serviceElementsFactory)
  }

  getAllUnlessAlreadyLoaded() {
    return this.loaded$.pipe(switchMap(x => {
      return x ? this.entities$ : this.getAll()
    }))
  }
  getWithQueryByFamEstFormDataUDNUnlessLoaded(udn: number): Observable<Family[]> {
    return this.entities$.pipe(switchMap(x => {
      if (x.length > 0){
        if (x.some(y => y.fam_est_form_data_udn== udn)){
          let z = x.filter(y => y.fam_est_form_data_udn== udn)
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
