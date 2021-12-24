import {EntitySize} from "./entitySize.model";
import {Country} from "./Country.model";
import {ApplType} from "./applType.model";
import {ApplDetail, ApplDetailSubmit, convertToApplDetails, convertToApplDetailsSubmit} from "./appl-detail.model";
import {
  convertToCustomApplDetails,
  convertToCustomApplDetailsSubmit,
  CustomApplDetails,
  CustomApplDetailsSubmit
} from "./CustomApplDetails.model";
import {map} from "lodash";
import {Language} from "./Language.model";
import {Application} from "./application.model";
import {
  convertToCustomApplOptions,
  convertToCustomApplOptionsSubmit,
  CustomApplOptions,
  CustomApplOptionsSubmit
} from "./CustomApplOptions.model";
import {IDocFormat} from "./DocFormat.model";

export interface multiCountry {
  custom_appl_details: CustomApplDetails
  custom_appl_options: CustomApplOptions
  country: Country
}

export class FamEstForm {
  public family_name: string = 'default family name'
  public family_no: string = 'default family no'
  public init_appl_filing_date: Date = new Date()
  public init_appl_country: Country = new Country()
  public init_appl_type: ApplType = new ApplType()
  public init_appl_details: ApplDetail = new ApplDetail()
  public init_appl_options: CustomApplOptions= new CustomApplOptions()
  public pct_method: boolean = false
  public pct_method_customization: {'custom_appl_details': CustomApplDetails, 'custom_appl_options': CustomApplOptions} = {'custom_appl_details': new CustomApplDetails(), 'custom_appl_options': new CustomApplOptions()}
  public pct_country: Country | null = new Country()
  public isa_country: Country | null = new Country()
  public pct_countries: multiCountry[] | null = [{'country': new Country(), 'custom_appl_details': new CustomApplDetails(), 'custom_appl_options': new CustomApplOptions()}]
  public ep_method: boolean = false
  public ep_method_customization: {'custom_appl_details': CustomApplDetails, 'custom_appl_options': CustomApplOptions } = {'custom_appl_details': new CustomApplDetails(), 'custom_appl_options': new CustomApplOptions()}
  public ep_countries: multiCountry[] | [] = []
  public paris_countries: multiCountry[] | null = [{'country': new Country(), 'custom_appl_details': new CustomApplDetails(), 'custom_appl_options': new CustomApplOptions()}]
  public unique_display_no?: number = 0
  public id?: any = 0

  constructor(init?: Partial<ApplDetail>) {
    Object.assign(this, init)
  }
}

export class FamEstFormSubmit {
  public family_name: string = 'default family name'
  public family_no: string = 'default family no'
  public init_appl_filing_date: string = ''
  public init_appl_country: number = 0
  public init_appl_type: number = 0
  public init_appl_details: ApplDetailSubmit = new ApplDetailSubmit()
  public init_appl_options: CustomApplOptions = new CustomApplOptions()
  public pct_method: boolean = false
  // public pct_method_customization: CustomApplDetails = new CustomApplDetails()
  public pct_method_customization: { 'custom_appl_details': CustomApplDetailsSubmit, 'custom_appl_options': CustomApplOptionsSubmit } = {
    'custom_appl_details': new CustomApplDetailsSubmit(),
    'custom_appl_options': new CustomApplOptionsSubmit()
  }
  public pct_country: number | null = 0
  public isa_country: number | null = 0
  public pct_countries: { 'custom_appl_details': CustomApplDetailsSubmit, 'custom_appl_options': CustomApplOptionsSubmit, 'country': number }[] | null = [{
    'custom_appl_details': new CustomApplDetailsSubmit(),
    'country': 0,
    'custom_appl_options': new CustomApplOptionsSubmit()
  }]
  public ep_method: boolean = false
  // public ep_method_customization: CustomApplDetails = new CustomApplDetails()
  public ep_method_customization: { 'custom_appl_details': CustomApplDetailsSubmit, 'custom_appl_options': CustomApplOptionsSubmit } = {
    'custom_appl_details': new CustomApplDetailsSubmit(),
    'custom_appl_options': new CustomApplOptionsSubmit()
  }
  // public ep_countries: null | {'custom_appl_details': CustomApplDetails, 'country': number}[] = [{'custom_appl_details': new CustomApplDetails(), 'country': 0}]
  public ep_countries: { 'custom_appl_details': CustomApplDetailsSubmit, 'custom_appl_options': CustomApplOptionsSubmit, 'country': number }[] | [] = []
  public paris_countries: { 'custom_appl_details': CustomApplDetailsSubmit, 'custom_appl_options': CustomApplOptionsSubmit, 'country': number }[] | null = [{
    'custom_appl_details': new CustomApplDetailsSubmit(),
    'country': 0,
    'custom_appl_options': new CustomApplOptionsSubmit()
  }]
  public unique_display_no?: number = 0
  public id?: any = 0

  constructor(init?: Partial<ApplDetail>) {
    Object.assign(this, init)
  }


}

export function convertToFamEstForm(famEstFormSubmit: FamEstFormSubmit,
                                    countries: Country[],
                                    applTypes: ApplType[],
                                    entitySizes: EntitySize[],
                                    languages: Language[],
                                    applications: Application[],
                                    doc_formats: IDocFormat[],) {
  let famEstForm = new FamEstForm()
  famEstForm.family_name = famEstFormSubmit.family_name
  famEstForm.family_no = famEstFormSubmit.family_no

  // const datetime = JSON.stringify(famEstFormSubmit.init_appl_filing_date)
  // const dateParts = datetime.split("T")
  // const dateSplit = dateParts[0].split('\"')
  famEstForm.init_appl_filing_date = new Date(famEstFormSubmit.init_appl_filing_date)
  famEstForm.init_appl_country = countries.find(x => x.id == famEstFormSubmit.init_appl_country)!
  famEstForm.init_appl_type = applTypes.find(x => x.id == famEstFormSubmit.init_appl_type)!
  famEstForm.init_appl_details = convertToApplDetails(famEstFormSubmit.init_appl_details, languages, entitySizes, applications)
  famEstForm.pct_country = countries.find(x => x.id == famEstFormSubmit.pct_country) || null
  famEstForm.isa_country = countries.find(x => x.id == famEstFormSubmit.isa_country)!
  famEstForm.pct_method = famEstFormSubmit.pct_method
  famEstForm.ep_method = famEstFormSubmit.ep_method
  if (famEstFormSubmit.ep_method_customization !== null) {
    if (famEstFormSubmit.ep_method_customization.custom_appl_details !== null) {
      famEstForm.ep_method_customization = {
        'custom_appl_details': convertToCustomApplDetails(famEstFormSubmit.ep_method_customization.custom_appl_details, languages, entitySizes, applications),
        'custom_appl_options': convertToCustomApplOptions(famEstFormSubmit.ep_method_customization.custom_appl_options, doc_formats)
      }
    }
  }
  if(famEstFormSubmit.pct_method_customization !== null){
    if (famEstFormSubmit.pct_method_customization.custom_appl_details !== null) {
      famEstForm.pct_method_customization = {
        'custom_appl_details': convertToCustomApplDetails(famEstFormSubmit.pct_method_customization.custom_appl_details, languages, entitySizes, applications),
        'custom_appl_options': convertToCustomApplOptions(famEstFormSubmit.pct_method_customization.custom_appl_options, doc_formats)
      }
      // famEstFormSubmit.pct_method_customization
    }
  }
  famEstForm.ep_countries = map(famEstFormSubmit.ep_countries, x => {
    let country = countries.find(y => y.id == x.country)!
    if (x.custom_appl_details == null) {
      return {
        'country': country,
        'custom_appl_details': new CustomApplDetails(),
        'custom_appl_options': new CustomApplOptions()
      }
    }
    return {
      'country': country,
      'custom_appl_details': convertToCustomApplDetails(x.custom_appl_details, languages, entitySizes, applications),
      'custom_appl_options': convertToCustomApplOptions(x.custom_appl_options, doc_formats)
    }
  })

  famEstForm.paris_countries = map(famEstFormSubmit.paris_countries, x => {
    let country = countries.find(y => y.id == x.country)!
    if (x.custom_appl_details == null) {
      return {
        'country': country,
        'custom_appl_details': new CustomApplDetails(),
        'custom_appl_options': new CustomApplOptions()
      }
    }
    return {
      'country': country,
      'custom_appl_details': convertToCustomApplDetails(x.custom_appl_details, languages, entitySizes, applications),
      'custom_appl_options': convertToCustomApplOptions(x.custom_appl_options, doc_formats)
    }
  })

  famEstForm.pct_countries = map(famEstFormSubmit.pct_countries, x => {
    let country = countries.find(y => y.id == x.country)!
    if (x.custom_appl_details == null) {
      return {
        'country': country,
        'custom_appl_details': new CustomApplDetails(),
        'custom_appl_options': new CustomApplOptions()
      }
    }
    return {
      'country': country,
      'custom_appl_details': convertToCustomApplDetails(x.custom_appl_details, languages, entitySizes, applications),
      'custom_appl_options': convertToCustomApplOptions(x.custom_appl_options, doc_formats)
    }
  })
  famEstForm.unique_display_no = famEstFormSubmit.unique_display_no
  famEstForm.id = famEstFormSubmit.id

  return famEstForm
}


export function convertToFamEstFormSubmit(famEstForm: FamEstForm){
  let famEstFormSubmit = new FamEstFormSubmit()
  famEstFormSubmit.family_name = famEstForm.family_name
  famEstFormSubmit.family_no = famEstForm.family_no

  const datetime = JSON.stringify(famEstForm.init_appl_filing_date)
  const dateParts = datetime.split("T")
  const dateSplit = dateParts[0].split('\"')
  famEstFormSubmit.init_appl_filing_date = dateSplit[1]
  famEstFormSubmit.init_appl_country = famEstForm.init_appl_country.id
  famEstFormSubmit.init_appl_type = famEstForm.init_appl_type.id
  famEstFormSubmit.init_appl_details = convertToApplDetailsSubmit(famEstForm.init_appl_details)
  console.log('famfmfmfmf', famEstFormSubmit.init_appl_details)
  famEstFormSubmit.pct_country = famEstForm.pct_country?.id || null
  famEstFormSubmit.isa_country = famEstForm.isa_country?.id || null
  famEstFormSubmit.pct_method = famEstForm.pct_method
  famEstFormSubmit.ep_method = famEstForm.ep_method
  famEstFormSubmit.ep_method_customization = {
    'custom_appl_details': convertToCustomApplDetailsSubmit(famEstForm.ep_method_customization.custom_appl_details),
    'custom_appl_options': convertToCustomApplOptionsSubmit(famEstForm.ep_method_customization.custom_appl_options)
  }
  // famEstFormSubmit.pct_method_customization = famEstForm.pct_method_customization
  famEstFormSubmit.pct_method_customization = {
    'custom_appl_details': convertToCustomApplDetailsSubmit(famEstForm.pct_method_customization.custom_appl_details),
    'custom_appl_options': convertToCustomApplOptionsSubmit(famEstForm.pct_method_customization.custom_appl_options)
  }
  // famEstForm.pct_method_customization
  // famEstFormSubmit.ep_countries = famEstForm.ep_countries
  famEstFormSubmit.ep_countries = map(famEstForm.ep_countries, x => {
    if (x == null) {
      return x
    }
    return {
      'country': x.country.id,
      'custom_appl_details': convertToCustomApplDetailsSubmit(x.custom_appl_details),
      'custom_appl_options': convertToCustomApplOptionsSubmit(x.custom_appl_options)
    }
  })
  famEstFormSubmit.paris_countries = map(famEstForm.paris_countries, x => {
    return {
      'country': x.country.id,
      'custom_appl_details': convertToCustomApplDetailsSubmit(x.custom_appl_details),
      'custom_appl_options': convertToCustomApplOptionsSubmit(x.custom_appl_options)
    }
  })
  console.log('famEstForm', famEstForm.paris_countries)
  console.log('famEst', famEstFormSubmit.paris_countries)
  famEstFormSubmit.pct_countries = map(famEstForm.pct_countries, x => {
    return {
      'country': x.country.id,
      'custom_appl_details': convertToCustomApplDetailsSubmit(x.custom_appl_details),
      'custom_appl_options': convertToCustomApplOptionsSubmit(x.custom_appl_options)
    }
  })
  famEstFormSubmit.unique_display_no = famEstForm.unique_display_no
  famEstFormSubmit.id = famEstForm.id
  console.log('ffffff', famEstFormSubmit)
  return famEstFormSubmit
}
