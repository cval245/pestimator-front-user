import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {switchMap} from "rxjs/operators";
import {IDetailedFeeCategory} from "../_models/DetailedFeeCategory.model";

@Injectable({
  providedIn: 'root'
})
export class DetailedFeeCategoryService extends EntityCollectionServiceBase<IDetailedFeeCategory> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('DetailedFeeCategory', serviceElementsFactory)
  }

  getAllUnlessAlreadyLoaded() {
    return this.loaded$.pipe(switchMap(x => x ? this.entities$ : this.getAll()))
  }
}
