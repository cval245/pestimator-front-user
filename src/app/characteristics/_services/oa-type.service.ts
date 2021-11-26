import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { OAType } from '../_models/oaType.model';
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OaTypeService extends EntityCollectionServiceBase<OAType>{

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('OAType', serviceElementsFactory)
    }
  getAllUnlessAlreadyLoaded(){
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
