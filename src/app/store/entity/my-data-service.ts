import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DefaultDataService, HttpUrlGenerator, Logger,} from '@ngrx/data';
import {Update} from '@ngrx/entity';
import {Observable} from 'rxjs';
import {defaultDataServiceConfig} from "../dataserviceconfig";

// import {defaultDataServiceConfig} from '../../app.module';

@Injectable()
export class MyDataService extends DefaultDataService<any> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('account', http, httpUrlGenerator, defaultDataServiceConfig);
    this.entitiesUrl = defaultDataServiceConfig.entityHttpResourceUrls!.UserProfile.collectionResourceUrl
    this.entityUrl = defaultDataServiceConfig.entityHttpResourceUrls!.UserProfile.entityResourceUrl
  }

  update(update: Update<any>): Observable<any> {
        const id = update && update.id;
        const updateOrError =
            id == null
            ? new Error(`No "${this.entityName}" update data or id`)
            : update.changes;
        return this.execute('PUT', this.entityUrl + id +'/', updateOrError);
    }
 }
