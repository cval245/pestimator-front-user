import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {switchMap} from "rxjs/operators";
import {ITranslationRequiredOptions} from "../_models/ITranslationRequiredOptions";

@Injectable({
  providedIn: 'root'
})
export class TranslationRequiredOptionsService extends EntityCollectionServiceBase<ITranslationRequiredOptions>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('TranslationRequiredOptions', serviceElementsFactory)
  }
  getAllUnlessAlreadyLoaded(){
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
