import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {LawFirm} from '../_models/law-firm.model';
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LawFirmService extends EntityCollectionServiceBase<LawFirm> {
  private full_loaded: boolean = false

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('LawFirm', serviceElementsFactory)
  }

  getAllUnlessAlreadyLoaded() {
    return this.loaded$.pipe(switchMap(x => {
      if (x && this.full_loaded){
        return this.entities$
      } else {
        this.full_loaded = true
        return this.getAll()
      }
    }))
  }
  getWithQueryByNameslugUnlessLoaded(slug: string): Observable<LawFirm[]> {

    return this.entities$.pipe(switchMap(x => {
      if (x.length > 0){
        if (x.some(y => y.slug == slug)){
          let z = x.filter(y => y.slug == slug)
          return of(z)
        }
        else{
          return super.getWithQuery('nameslug=' + slug)
        }
      } else {
        return super.getWithQuery('nameslug=' + slug)
      }
    }))
  }

}
