import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Language} from "../_models/Language.model";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends EntityCollectionServiceBase<Language> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Language', serviceElementsFactory)
  }
  getAllUnlessAlreadyLoaded(){
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
