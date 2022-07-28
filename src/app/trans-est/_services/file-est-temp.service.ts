import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {IFileEstTempSubmit} from '../_models/FileEstTemp.model';

@Injectable({
  providedIn: 'root'
})
export class FileEstTempService extends EntityCollectionServiceBase<IFileEstTempSubmit> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('FileEstTemp', serviceElementsFactory)
  }
}
