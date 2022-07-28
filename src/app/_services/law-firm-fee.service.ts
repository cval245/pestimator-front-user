import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {switchMap} from "rxjs/operators";
import {LawFirmFee} from "../_models/LawFirmFee.model";

@Injectable({
  providedIn: 'root'
})
export class LawFirmFeeService extends EntityCollectionServiceBase<LawFirmFee> {
  private full_loaded: boolean = false

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('LawFirmFee', serviceElementsFactory)
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
