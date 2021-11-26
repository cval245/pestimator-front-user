import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {Language} from "../../characteristics/_models/Language.model";
import {Application} from "../../application/_models/application.model";
import {find} from "lodash";

export class CustomApplDetails{
  public num_indep_claims: number | null = null
  public num_claims: number | null = null
  public num_claims_multiple_dependent: number | null = 0
  public num_drawings: number | null = null
  public num_pages_description: number | null = null
  public num_pages_claims: number | null = null
  public num_pages_drawings: number | null = null
  public language: Language | null = null
  public entity_size: EntitySize | null = null
  public application: Application | null = null
  public id?: number = undefined
  constructor(init?:Partial<CustomApplDetails>){
    Object.assign(this, init)
  }
}
export class CustomApplDetailsSubmit{
  public num_indep_claims: number | null = null
  public num_claims: number | null = null
  public num_claims_multiple_dependent: number | null = null
  public num_drawings: number | null = null
  public num_pages_description: number | null = null
  public num_pages_claims: number | null = null
  public num_pages_drawings: number | null = null
  public language: number | null = null
  public entity_size: number | null = null
  public application: number | null = null
  public id?: number = undefined
  constructor(init?:Partial<CustomApplDetailsSubmit>){
    Object.assign(this, init)
  }
}

export function convertToCustomApplDetailsSubmit(cApplDetails: CustomApplDetails): CustomApplDetailsSubmit{
  let cApplDetailsSubmit = new CustomApplDetailsSubmit()
  cApplDetailsSubmit = {...cApplDetails,
    'language': cApplDetails.language?.id || null,
    'entity_size': cApplDetails.entity_size?.id || null,
    'application': cApplDetails.application?.id || null
  }
  return cApplDetailsSubmit // cApplDetailsSubmit
}
export function convertToCustomApplDetails(cApplDetailsSubmit: CustomApplDetailsSubmit,
                                           languages: Language[],
                                           entitySizes: EntitySize[],
                                           applications: Application[]): CustomApplDetails{
  let cApplDetails = new CustomApplDetails()
  cApplDetails = {... cApplDetailsSubmit,
    'language': find(languages, x => x.id == cApplDetailsSubmit.language) || null,
    'entity_size': find(entitySizes, x => x.id == cApplDetailsSubmit.entity_size) || null,
    'application': find(applications, x => x.id == cApplDetailsSubmit.application) || null
  }
  return cApplDetails
}
