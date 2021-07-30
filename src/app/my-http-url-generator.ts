import { kebabCase } from 'lodash';
import { Injectable } from '@angular/core';

import {
    DefaultHttpUrlGenerator,
    HttpUrlGenerator,
    EntityHttpResourceUrls,
    HttpResourceUrls,
    normalizeRoot,
    Pluralizer
} from '@ngrx/data';


@Injectable()
export class MyHttpUrlGenerator extends DefaultHttpUrlGenerator {
    constructor(private myPluralizer: Pluralizer) {
        super(myPluralizer);
    }

    protected getResourceUrls(
        entityName: string,
        root: string
    ): HttpResourceUrls {
        let resourceUrls = this.knownHttpResourceUrls[entityName];
        entityName= kebabCase(entityName)
        if (!resourceUrls) {
            const nRoot = normalizeRoot(root);
            //const url = `${nRoot}/bob/`
            const url = `${nRoot}/${this.myPluralizer.pluralize(entityName)}/`.toLowerCase();
            resourceUrls = {
                entityResourceUrl: url,
                collectionResourceUrl: url
            };
            this.registerHttpResourceUrls({ [entityName]: resourceUrls });
        }
        return resourceUrls;
    }
}
