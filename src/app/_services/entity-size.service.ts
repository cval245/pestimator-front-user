import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {EntitySize} from '../_models/entitySize.model';
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EntitySizeService extends EntityCollectionServiceBase<EntitySize>{

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('EntitySize', serviceElementsFactory)
    }
  getAllUnlessAlreadyLoaded(){
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
