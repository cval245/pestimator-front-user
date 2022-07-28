import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {switchMap} from "rxjs/operators";
import {LawFirmFeeFull} from "../_models/LawFirmFeeTypeFull.model";

@Injectable({
  providedIn: 'root'
})
export class LawFirmFeeFullService extends EntityCollectionServiceBase<LawFirmFeeFull> {
  private full_loaded: boolean = false

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('LawFirmFeeFull', serviceElementsFactory)
  }

  getAllUnlessAlreadyLoaded() {
    return this.loaded$.pipe(switchMap(x => {
      if (x && this.full_loaded) {
        return this.entities$
      } else {
        this.full_loaded = true
        return this.getAll()
      }
    }))
  }
}
