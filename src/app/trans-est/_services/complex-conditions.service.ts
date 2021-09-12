import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {IComplexConditions} from "../_models/ComplexConditions.model";

@Injectable({
  providedIn: 'root'
})
export class ComplexConditionsService extends EntityCollectionServiceBase<IComplexConditions> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ComplexConditions', serviceElementsFactory)
  }
}
