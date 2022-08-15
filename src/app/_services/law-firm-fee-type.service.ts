import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {switchMap} from "rxjs/operators";
import {LawFirmFeeType} from "../_models/LawFirmFeeType.model";

@Injectable({
  providedIn: 'root'
})
export class LawFirmFeeTypeService extends EntityCollectionServiceBase<LawFirmFeeType> {

  private full_loaded: boolean = false

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('LawFirmFeeType', serviceElementsFactory)
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
