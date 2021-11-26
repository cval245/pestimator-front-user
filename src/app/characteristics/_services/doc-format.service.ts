import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {IDocFormat} from "../_models/DocFormat.model";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DocFormatService extends EntityCollectionServiceBase<IDocFormat>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('DocFormat', serviceElementsFactory)
  }
  getAllUnlessAlreadyLoaded(): Observable<IDocFormat[]> {
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
