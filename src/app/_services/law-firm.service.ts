import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {LawFirm} from '../_models/law-firm.model';
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LawFirmService extends EntityCollectionServiceBase<LawFirm> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('LawFirm', serviceElementsFactory)
  }

  getAllUnlessAlreadyLoaded() {
    return this.loaded$.pipe(switchMap(x => x ? this.entities$ : this.getAll()))
  }
}
