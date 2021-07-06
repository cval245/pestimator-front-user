import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
    LawFirm: {},
    FamEst: {},
    FamEstDetail: {},
    FamEstForm: {},
    Country: {},
    EntitySize: {},
    ApplType: {},
    OAType: {},
    Family: {},
    Application: {},
    ApplDetail: {},
    UserProfile: {},
    CustomFilTrans: {},
    PublTrans: {},
    OATrans: {},
    AllowTrans: {},
    IssueTrans: {},
    CountryOANum: {},
    BaseEstTemp: {},
    FileEstTemp: {},
    PublEstTemp: {},
    OAEstTemp: {},
    AllowEstTemp: {},
    IssueEstTemp: {},
};

// because the plural of "hero" is not "heros"
const pluralNames = { LawFirm: 'LawFirms', FamEst: 'FamEst'};

export const entityConfig = {
    entityMetadata,
    pluralNames
};
