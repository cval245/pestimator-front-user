import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Language} from "../_models/Language.model";

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends EntityCollectionServiceBase<Language> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Language', serviceElementsFactory)
  }
}
