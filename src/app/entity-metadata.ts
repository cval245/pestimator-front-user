import {EntityMetadataMap} from '@ngrx/data';
import {IAllowEstTemp} from './trans-est/_models/AllowEstTemp.model';
import {IAllowTrans} from './trans-est/_models/AllowTrans.model';
import {IBaseEstTemp} from './trans-est/_models/BaseEstTemp.model';
import {ICustomFilTrans} from './trans-est/_models/CustomFilTrans.model';
import {IFileEstTemp} from './trans-est/_models/FileEstTemp.model';
import {IIssueEstTemp} from './trans-est/_models/IssueEstTemp.model';
import {IIssueTrans} from './trans-est/_models/IssueTrans.model';
import {IOAEstTemp} from './trans-est/_models/OAEstTemp.model';
import {IOATrans} from './trans-est/_models/OATrans.model';
import {IPublEstTemp} from './trans-est/_models/PublEstTemp.model';
import {IPublTrans} from './trans-est/_models/PublTrans.model';
import {IUSOAEstTemp} from "./trans-est/_models/IUSOAEstTemp";

const entityMetadata: EntityMetadataMap = {
  LawFirm: {},
  FamEst: {},
  FamEstDetail: {},
  FamEstForm: {},
  Country: {},
  CountryAll: {},
  EntitySize: {},
  ApplType: {},
  OAType: {},
  Family: {},
  Application: {},
  ApplDetail: {},
  UserProfile: {},
  CustomFilTrans: {
    filterFn: (entities: ICustomFilTrans[], country_id: any) => {
      return entities.filter(entity => entity.country == country_id.country_id)
    }
  },
  PublTrans: {
    filterFn: (entities: IPublTrans[], country_id: any) => {
      return entities.filter(entity => entity.country == country_id.country_id)
    }
  },
  OATrans: {
    filterFn: (entities: IOATrans[], country_id: any) => {
      return entities.filter(entity => entity.country == country_id.country_id)
    }
  },
  AllowTrans: {
    filterFn: (entities: IAllowTrans[], country_id: any) => {
      return entities.filter(entity => entity.country == country_id.country_id)
    }
  },
  IssueTrans: {
    filterFn: (entities: IIssueTrans[], country_id: any) => {
      return entities.filter(entity => entity.country == country_id.country_id)
    }
  },
  CountryOANum: {
    filterFn: (entities: IIssueTrans[], country_id: any) => {
      return entities.filter(entity => entity.country == country_id.country_id)
    }
  },
  BaseEstTemp: {
    filterFn: (entities: IBaseEstTemp[], country_id: any) => {
      return entities.filter(entity => entity.country == country_id.country_id)
    }
  },
  FileEstTemp: {
    filterFn: (entities: IFileEstTemp[], country_id: any) => {
      return entities.filter(entity => entity.country == country_id.country_id)
    }
  },
  PublEstTemp: {
    filterFn: (entities: IPublEstTemp[], country_id: any) => {
      return entities.filter(entity => entity.country == country_id.country_id)
    }
  },
  OAEstTemp: {
    filterFn: (entities: IOAEstTemp[], country_id: any) => {
      return entities.filter(entity => entity.country == country_id.country_id)
    }
  },
  USOAEstTemp: {
    filterFn: (entities: IUSOAEstTemp[], country_id: any) => {
      return entities.filter(entity => entity.country == country_id.country_id)
    }
  },
  AllowEstTemp: {
    filterFn: (entities: IAllowEstTemp[], country_id: any) => {
      return entities.filter(entity => entity.country == country_id.country_id)
    }
  },
  IssueEstTemp: {
    filterFn: (entities: IIssueEstTemp[], country_id: any) => {
      return entities.filter(entity => entity.country == country_id.country_id)
    }
  },
  LawFirmEstTemp: {},
  Conditions: {},
};

// because the plural of "hero" is not "heros"
const pluralNames = { LawFirm: 'LawFirms', FamEst: 'FamEst'};

export const entityConfig = {
    entityMetadata,
    pluralNames
};
