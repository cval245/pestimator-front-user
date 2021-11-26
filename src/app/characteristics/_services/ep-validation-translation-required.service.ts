import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {IEPValidationTranslationRequired} from "../_models/IEPValidationTranslationRequired.model";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EpValidationTranslationRequiredService extends EntityCollectionServiceBase<IEPValidationTranslationRequired>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('EPValidationTranslationRequired', serviceElementsFactory)
  }
  getAllUnlessAlreadyLoaded(){
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
