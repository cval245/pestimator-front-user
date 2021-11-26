import { Injectable } from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {ITransComplexTime} from "../_models/TransComplexTime";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TransComplexTimeService extends EntityCollectionServiceBase<ITransComplexTime>{
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('TransComplexTime', serviceElementsFactory)
  }
  getAllUnlessAlreadyLoaded(){
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
