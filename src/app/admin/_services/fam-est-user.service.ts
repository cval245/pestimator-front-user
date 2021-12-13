import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {FamEstUser} from "../_models/FamEstUser.model";

@Injectable({
  providedIn: 'root'
})
export class FamEstUserService extends EntityCollectionServiceBase<FamEstUser>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('FamEstUser', serviceElementsFactory)
  }
  getAllUnlessAlreadyLoaded(): Observable<FamEstUser[]> {
    return this.loaded$.pipe(switchMap(x => x? this.entities$: this.getAll()))
  }
}
