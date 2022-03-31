import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {Application} from '../_models/application.model';
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends EntityCollectionServiceBase<Application> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Application', serviceElementsFactory)
  }

  getWithQueryByFamEstFormDataUDNUnlessLoaded(udn: number): Observable<Application[]> {
    return this.entities$.pipe(switchMap(x => {
      if (x.length > 0) {
        if (x.some(y => y.family_udn == udn)) {
          let z = x.filter(y => y.family_udn == udn)
          return of(z)
        } else {
          return super.getWithQuery('familyUDN=' + udn)
        }
      } else {
        return super.getWithQuery('familyUDN=' + udn)
      }
    }))
  }
}
