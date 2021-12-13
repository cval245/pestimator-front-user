import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {IFileEstTemp} from '../_models/FileEstTemp.model';

@Injectable({
  providedIn: 'root'
})
export class FileEstTempService extends EntityCollectionServiceBase<IFileEstTemp>{
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('FileEstTemp', serviceElementsFactory)
   }
}
