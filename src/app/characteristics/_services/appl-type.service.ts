import {Injectable} from '@angular/core';
import {ApplType} from '../_models/applType.model';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplTypeService extends EntityCollectionServiceBase<ApplType>{

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('ApplType', serviceElementsFactory)
    }

  getAllUnlessAlreadyLoaded(): Observable<ApplType[]> {
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
