import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory,} from '@ngrx/data';
import {FamEstDetail} from '../_models/FamEstDetail.model';

@Injectable({
  providedIn: 'root'
})
export class FamEstDetailService extends EntityCollectionServiceBase<FamEstDetail>{
    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('FamEstDetail', serviceElementsFactory)
    }
}

// export class FamEstDetailService extends DefaultDataService<FamEstDetail>{
//     constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
//         super('FamEstDetail', http, httpUrlGenerator);
//         logger.log('created custom FamEstDetail')
//     }

//     getAll(): Observable<FamEstDetail[]>{
//         return super.getAll().pipe(map(famEsts => famEsts.map(famEst => this.mapFamEst(famEst))))
//     }
//     mapFamEst(famEst: FamEst): FamEst{
//         return { ...famEst };
//     }


// }

