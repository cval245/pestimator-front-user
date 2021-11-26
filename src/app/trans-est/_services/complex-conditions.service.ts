import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {IComplexConditions} from "../_models/ComplexConditions.model";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ComplexConditionsService extends EntityCollectionServiceBase<IComplexConditions> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ComplexConditions', serviceElementsFactory)
  }
  getAllUnlessAlreadyLoaded(){
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
