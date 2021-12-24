import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {UserAll} from "../_models/UserAll.model";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserAllService extends EntityCollectionServiceBase<UserAll>{
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('UserAll', serviceElementsFactory)
  }
  getAllUnlessAlreadyLoaded(): Observable<UserAll[]> {
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
