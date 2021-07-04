import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Application } from '../_models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends EntityCollectionServiceBase<Application>{
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Application', serviceElementsFactory)
    }
}
