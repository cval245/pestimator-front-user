import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {IComplexTimeConditions} from "../../trans-est/_models/IComplexTimeConditions";

@Injectable({
  providedIn: 'root'
})
export class ComplexTimeConditionsService extends EntityCollectionServiceBase<IComplexTimeConditions> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ComplexTimeConditions', serviceElementsFactory)
  }
}

