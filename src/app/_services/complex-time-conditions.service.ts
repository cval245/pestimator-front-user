import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {IComplexTimeConditions} from "../trans-est/_models/IComplexTimeConditions";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ComplexTimeConditionsService extends EntityCollectionServiceBase<IComplexTimeConditions> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ComplexTimeConditions', serviceElementsFactory)
  }
  getAllUnlessAlreadyLoaded(){
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}

