import {Injectable} from '@angular/core';
import {ApplType} from '../_models/applType.model';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApplTypeAllService extends EntityCollectionServiceBase<ApplType> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ApplTypeAll', serviceElementsFactory)
  }

  getAllUnlessAlreadyLoaded(){
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
