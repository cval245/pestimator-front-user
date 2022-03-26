import {Language} from "./Language.model";
import {EntitySize} from "./entitySize.model";
import {Application} from "./application.model";
import {find} from "lodash";

export class ApplDetail {
  public num_indep_claims: number = 0
  public num_claims: number = 0
  public num_claims_multiple_dependent: number = 0
  public num_drawings: number = 0
  public num_pages_description: number = 0
  public num_pages_claims: number = 0
  public num_pages_drawings: number = 0
  public language: Language = {} as Language
  public entity_size: EntitySize | null = null
  public application?: any = null
  public id?: number = 0
  public family_udn?: number = 0

  constructor(init?: Partial<ApplDetail>) {
    Object.assign(this, init)
  }

}

export function convertToApplDetailsSubmit(applDetail: ApplDetail): ApplDetailSubmit {
  return {
    ...applDetail,
    'language': applDetail.language?.id, //|| applDetail.language,
    'entity_size': applDetail.entity_size?.id || null,
    'application': applDetail.application?.id || null
  }
}


export class ApplDetailSubmit {
  public num_indep_claims: number = 0
  public num_claims: number = 0
  public num_claims_multiple_dependent: number = 0
  public num_drawings: number = 0
  public num_pages_description: number = 0
  public num_pages_claims: number = 0
  public num_pages_drawings: number = 0
  public language: number = 0
  public entity_size: number | null = null
  public application?: any = 0
  public id?: number = 0

  constructor(init?: Partial<ApplDetail>) {
    Object.assign(this, init)
  }
}

export function convertToApplDetails(applDetailSubmit: ApplDetailSubmit,
                                     languages: Language[],
                                     entitySizes: EntitySize[],
                                     applications: Application[]): ApplDetail {
  return {
    ...applDetailSubmit,
    'language': find(languages, x => x.id == applDetailSubmit.language)!,
    'entity_size': find(entitySizes, x => x.id == applDetailSubmit.entity_size) || null,
    'application': find(applications, x => x.id == applDetailSubmit.application) || null
  }
}


