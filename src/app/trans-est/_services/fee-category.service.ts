import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {switchMap} from "rxjs/operators";
import {IFeeCategory} from "../_models/FeeCategory.model";

@Injectable({
  providedIn: 'root'
})
export class FeeCategoryService extends EntityCollectionServiceBase<IFeeCategory> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('FeeCategory', serviceElementsFactory)
  }

  getAllUnlessAlreadyLoaded() {
    return this.loaded$.pipe(switchMap(x => x ? this.entities$ : this.getAll()))
  }
}
