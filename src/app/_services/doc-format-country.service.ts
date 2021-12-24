import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {IDocFormatCountry} from "../_models/DocFormatCountry.model";

@Injectable({
  providedIn: 'root'
})
export class DocFormatCountryService extends EntityCollectionServiceBase<IDocFormatCountry> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('DocFormatCountry', serviceElementsFactory)
  }

  getAllUnlessAlreadyLoaded(): Observable<IDocFormatCountry[]> {
    return this.loaded$.pipe(switchMap(x => x ? this.entities$ : this.getAll()))
  }
}
