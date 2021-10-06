import {DefaultDataServiceConfig} from "@ngrx/data";
import {environment} from "../../environments/environment";

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.API_URL,
  entityHttpResourceUrls: {
    UserDetail: {
      entityResourceUrl: environment.API_URL + 'user-detail/',
      collectionResourceUrl: environment.API_URL + 'user-detail/'
    },
    LawFirm: {
      entityResourceUrl: environment.API_URL + 'lawfirms/',
      collectionResourceUrl: environment.API_URL + 'lawfirms/'
    },
    FamEst: {
      entityResourceUrl: environment.API_URL + 'fam-est/',
      collectionResourceUrl: environment.API_URL + 'fam-est/',
    },
    Country: {
      entityResourceUrl: environment.API_URL + 'countries/',
      collectionResourceUrl: environment.API_URL + 'countries/',
    },
    CountryAll: {
      entityResourceUrl: environment.API_URL + 'countries-all/',
      collectionResourceUrl: environment.API_URL + 'countries-all/',
    },
    FamEstDetail: {
      entityResourceUrl: environment.API_URL + 'fam-est-detail/',
      collectionResourceUrl: environment.API_URL + 'fam-est-detail/',
    },
    EntitySize: {
      entityResourceUrl: environment.API_URL + 'entity-size/',
      collectionResourceUrl: environment.API_URL + 'entity-size/',
    },
    ApplType: {
      entityResourceUrl: environment.API_URL + 'appl-types/',
      collectionResourceUrl: environment.API_URL + 'appl-types/',
    },
    ApplTypeAll: {
      entityResourceUrl: environment.API_URL + 'appl-types-all/',
      collectionResourceUrl: environment.API_URL + 'appl-types-all/',
    },
    FamEstForm: {
      entityResourceUrl: environment.API_URL + 'fam-est-form-data/',
      collectionResourceUrl: environment.API_URL + 'fam-est-form-data/',
    },
    Family: {
      entityResourceUrl: environment.API_URL + 'families/',
      collectionResourceUrl: environment.API_URL + 'families/',
    },
    UserProfile: {
      entityResourceUrl: environment.API_URL + 'account/',
      collectionResourceUrl: environment.API_URL + 'account/',
    },
    Application: {
      entityResourceUrl: environment.API_URL + 'applications/',
      collectionResourceUrl: environment.API_URL + 'applications/',
    },
    ApplDetail: {
      entityResourceUrl: environment.API_URL + 'specs/',
      collectionResourceUrl: environment.API_URL + 'specs/',
    },
    CustomFilTrans: {
      entityResourceUrl: environment.API_URL + 'custom-filing-transform/',
      collectionResourceUrl: environment.API_URL + 'custom-filing-transform/',
    },
    PublTrans: {
      entityResourceUrl: environment.API_URL + 'publication-transform/',
      collectionResourceUrl: environment.API_URL + 'publication-transform/',
    },
    OATrans: {
      entityResourceUrl: environment.API_URL + 'oa-transform/',
      collectionResourceUrl: environment.API_URL + 'oa-transform/',
    },
    AllowTrans: {
      entityResourceUrl: environment.API_URL + 'allowance-transform/',
      collectionResourceUrl: environment.API_URL + 'allowance-transform/',
    },
    IssueTrans: {
      entityResourceUrl: environment.API_URL + 'issue-transform/',
      collectionResourceUrl: environment.API_URL + 'issue-transform/',
    },
    CountryOANum: {
      entityResourceUrl: environment.API_URL + 'country-oanum/',
      collectionResourceUrl: environment.API_URL + 'country-oanum/',
    },
    BaseEstTemp: {
      entityResourceUrl: environment.API_URL + 'base-est-template/',
      collectionResourceUrl: environment.API_URL + 'base-est-template/',
    },
    FileEstTemp: {
      entityResourceUrl: environment.API_URL + 'filing-est-template/',
      collectionResourceUrl: environment.API_URL + 'filing-est-template/',
    },
    PublEstTemp: {
      entityResourceUrl: environment.API_URL + 'publication-est-template/',
      collectionResourceUrl: environment.API_URL + 'publication-est-template/',
    },
    OAEstTemp: {
      entityResourceUrl: environment.API_URL + 'oa-est-template/',
      collectionResourceUrl: environment.API_URL + 'oa-est-template/',
    },
    USOAEstTemp: {
      entityResourceUrl: environment.API_URL + 'us-oa-est-template/',
      collectionResourceUrl: environment.API_URL + 'us-oa-est-template/',
    },
    AllowEstTemp: {
      entityResourceUrl: environment.API_URL + 'allowance-est-template/',
      collectionResourceUrl: environment.API_URL + 'allowance-est-template/',
    },
    IssueEstTemp: {
      entityResourceUrl: environment.API_URL + 'issue-est-template/',
      collectionResourceUrl: environment.API_URL + 'issue-est-template/',
    },
    Conditions: {
      entityResourceUrl: environment.API_URL + 'conditions/',
      collectionResourceUrl: environment.API_URL + 'conditions/',
    },
    ComplexConditions: {
      entityResourceUrl: environment.API_URL + 'complex-conditions/',
      collectionResourceUrl: environment.API_URL + 'complex-conditions/',
    },
    ComplexTimeConditions: {
      entityResourceUrl: environment.API_URL + 'complex-time-conditions/',
      collectionResourceUrl: environment.API_URL + 'complex-time-conditions/',
    },
    LawFirmEstTemp: {
      entityResourceUrl: environment.API_URL + 'lawfirm-est-template/',
      collectionResourceUrl: environment.API_URL + 'lawfirm-est-template/',
    }
  }
}
