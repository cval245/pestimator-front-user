import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from "@ngrx/data";
import {LawFirmImage} from "../_models/law-firm-image.model";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LawFirmImageService extends EntityCollectionServiceBase<LawFirmImage>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('LawFirmImage', serviceElementsFactory)
  }

  getAllUnlessAlreadyLoaded() {
    return this.loaded$.pipe(switchMap(x => x ? this.entities$ : this.getAll()))
  }
}
