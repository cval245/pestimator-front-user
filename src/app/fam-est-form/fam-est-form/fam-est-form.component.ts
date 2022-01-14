import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup,} from '@angular/forms';
import {FamEstForm} from '../../_models/FamEstForm.model';
import {ApplType} from '../../_models/applType.model';
import {Country, CountryDetailsAdded} from '../../_models/Country.model';
import {EntitySize} from '../../_models/entitySize.model';
import {Subject} from "rxjs";
import {APPL_VERSIONS} from "../../estimation/enums";
import {CustomApplDetails} from "../../_models/CustomApplDetails.model";
import {filter, find, forEach, map, some} from "lodash";
import {CustomApplOption} from "../../_models/CustomApplOptions.model";
import {IDocFormat} from "../../_models/DocFormat.model";
import {Language} from "../../_models/Language.model";


export interface ICustomDetail {
  country: Country,
  appl_type: ApplType,
  appl_version: APPL_VERSIONS,
  customDetails: CustomApplDetails,
  customOptions: CustomApplOption
}

export interface IParisForm extends FormGroup {
  value: {
    paris_countries: {
      selected: boolean,
      country: Country,
      custom_appl_details: CustomApplDetails,
      custom_appl_options: CustomApplOption,
    }
  }
}

@Component({
  selector: 'app-fam-est-form',
  templateUrl: './fam-est-form.component.html',
  styleUrls: ['./fam-est-form.component.scss']
})
export class FamEstFormComponent implements OnInit, OnDestroy, OnChanges {

  public familyFormComplete: boolean = false
  public firstApplFormComplete: boolean = false
  public internationalStageFormComplete: boolean = false
  public epStageFormComplete: boolean = false
  public parisStageFormComplete: boolean = true
  public singleUtilityFormComplete: boolean = false

  @Input() applTypes: ApplType[] = [new ApplType()];
  @Input() docFormats: IDocFormat[] = new Array<IDocFormat>()
  @Input() countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  @Input() languages: Language[] = new Array<Language>()
  @Input() entitySizes: EntitySize[] = [new EntitySize()];
  @Input() allCustomDetails: ICustomDetail[] = new Array<ICustomDetail>()
  @Input() customOpt: CustomApplOption = new CustomApplOption();
  @Output() formData = new EventEmitter;
  @Output() customAppl = new EventEmitter;
  @Output() customApplOptions = new EventEmitter;
  public firstApplCustomOption: CustomApplOption = new CustomApplOption()
  public pct_ro_countries: CountryDetailsAdded[] = [];
  public pct_accept_countries: CountryDetailsAdded[] = [];
  public ep_countries: CountryDetailsAdded[] = [];
  public addlCountries: Country[] = new Array<Country>()
  public customApplOptionsToolTip: string = 'Customize Application Options';
  public filteredEntitySizes: EntitySize[] = [new EntitySize()];
  public filteredLanguages: Language[] = new Array<Language>()
  public aggFormData: FamEstForm = new FamEstForm();
  public interOption: Boolean = true;
  public epOption: Boolean = true
  public isEditable = true;
  public addlInfoFormRequired: boolean = false
  public defaultEntitySize: EntitySize = new EntitySize();
  public applTypesCorrect: ApplType[] = [new ApplType()];
  public isa_countries: CountryDetailsAdded[] = [];
  public paris_countries: CountryDetailsAdded[] = [];
  public pct_countries: CountryDetailsAdded[] = [];
  public FINAL_STEPS = {
    PARIS_STAGE: "parisstage",
    EP_STAGE: "epstage",
    PCT_STAGE: "pctstage",
    ADDL_STAGE: "addlstage",
  }

  public country_ep: CountryDetailsAdded = new CountryDetailsAdded()
  public finalStep = this.FINAL_STEPS.PARIS_STAGE
  private destroyed = new Subject<void>()
  public pctDisplayCustomCountries: any[] = [];
  public parisDisplayCustomCountries: any[] = [];
  public epDisplayCustomCountries: any[] = [];
  public parisCustomAppl: ICustomDetail[] = new Array<ICustomDetail>();
  public pctCustomAppl: ICustomDetail[] = new Array<ICustomDetail>();
  public epCustomAppl: ICustomDetail[] = new Array<ICustomDetail>();
  public pctMethodCustomAppl: ICustomDetail = {} as ICustomDetail;
  public epMethodCustomAppl: ICustomDetail = {} as ICustomDetail;
  public blockedParisCountries: Country[] = new Array<Country>();
  public blockedEPValidCountries: Country[] = new Array<Country>();
  public blockedPCTAcceptCountries: Country[] = new Array<Country>();
  public blockedPCTCountry: Country = new Country();
  private addlStageForm: any;


  constructor() {
  }


  findDefaultEntitySize(country: Country) {
    return find(this.entitySizes, x => {
      return x.default_bool && x.country == country.id
    })!
  }

  filterAllEntitySizes(country: Country) {
    return filter(this.entitySizes, x => {
      return x.country == country.id
    })
  }


  ngOnInit(): void {

  }


  ngOnChanges(): void {
    this.parisCustomAppl = filter(this.allCustomDetails, x => x.appl_version == APPL_VERSIONS.PARIS_APPL)
    if (some(this.allCustomDetails, x => x.appl_version == APPL_VERSIONS.PCT_APPL)) {
      this.pctMethodCustomAppl = find(this.allCustomDetails, x => x.appl_version == APPL_VERSIONS.PCT_APPL)!
    }
    this.pctCustomAppl = filter(this.allCustomDetails, x => x.appl_version == APPL_VERSIONS.PCT_NAT_APPL)
    if (some(this.allCustomDetails, x => x.appl_version == APPL_VERSIONS.EP_APPL)) {
      this.epMethodCustomAppl = find(this.allCustomDetails, x => x.appl_version == APPL_VERSIONS.EP_APPL)!
    }
    this.epCustomAppl = filter(this.allCustomDetails, x => x.appl_version == APPL_VERSIONS.EP_VALID_APPL)
  }

  onSubmit() {
    if (this.addlStageForm){
      this.addAddlStageForm()
    }
    this.formData.emit(this.aggFormData)
  }

  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
  }

  setFamilyForm(familyForm: any) {
    this.familyFormComplete = familyForm.valid
    this.aggFormData.family_name = familyForm.controls.family_name.value
    this.aggFormData.family_no = familyForm.controls.family_no.value
  }

  setInitApplForm(firstApplForm: any) {
    this.firstApplFormComplete = firstApplForm.valid
    // Initial Application
    this.aggFormData.init_appl_filing_date = firstApplForm.controls.date_filing.value
    this.aggFormData.init_appl_country = firstApplForm.controls.country.value
    this.aggFormData.init_appl_type = firstApplForm.controls.application_type.value
    this.aggFormData.init_appl_details = {
      'num_drawings': firstApplForm.controls.num_drawings.value,
      'num_pages_description': firstApplForm.controls.num_pages_desc.value,
      'num_pages_claims': firstApplForm.controls.num_pages_claims.value,
      'num_pages_drawings': firstApplForm.controls.num_pages_drawings.value,
      'num_claims': firstApplForm.controls.num_claims.value,
      'num_indep_claims': firstApplForm.controls.num_indep_claims.value,
      'num_claims_multiple_dependent': firstApplForm.controls.num_multiple_dependent_claims.value,
      'language': firstApplForm.controls.language.value,
      'entity_size': firstApplForm.controls.entity_size.value,
    }
    this.aggFormData.init_appl_options = firstApplForm.controls.init_appl_options.value
    this.aggFormData.pct_method = firstApplForm.controls.pct_method.value
    this.aggFormData.ep_method = firstApplForm.controls.ep_method.value

  }

  setParisStageForm(parisStageForm: IParisForm) {
    this.parisStageFormComplete = parisStageForm.valid
    // Paris Stage form
    let paris_array = parisStageForm.controls.paris_countries as FormArray
    this.aggFormData.paris_countries = map(filter(paris_array.value, x => {
      return x.selected == true
    }), y => {
      return {
        'country': y.country,
        'custom_appl_details': y.custom_appl_details,
        'custom_appl_options': y.custom_appl_options
      }
    })
    this.updateData()
  }

  setInternationalStageForm(internationalStageForm: any) {
    this.aggFormData.pct_method_customization = internationalStageForm.controls.pct_method_customization.value
    // International Stage Form
    this.aggFormData.pct_country = internationalStageForm.controls.pct_country.value
    this.aggFormData.isa_country = internationalStageForm.controls.isa_country.value
    this.aggFormData.pct_countries = map(filter(internationalStageForm.controls.pct_countries.value, x => {
      return x.selected == true
    }), y => {
      return {
        'country': y.country,
        'custom_appl_details': y.custom_appl_details,
        'custom_appl_options': y.custom_appl_options
      }
    })
    this.updateData()
  }

  setEPStageForm(epStageForm: any) {
    this.epStageFormComplete = epStageForm.valid
    this.aggFormData.ep_method_customization = epStageForm.controls.ep_method_customization.value
    this.aggFormData.ep_countries = map(filter(epStageForm.controls.ep_countries.value, x => {
      return x.selected == true
    }), y => {
      return {
        'country': y.country,
        'custom_appl_details': y.custom_appl_details,
        'custom_appl_options': y.custom_appl_options
      }
    })
    this.updateData()
  }

  addEntitySize(countries: any, x: any){
    let pct_nat_country = find(countries, c => {
      return c.country == x.country
    })
    if (pct_nat_country) {
      pct_nat_country.custom_appl_details.entity_size = x.entity_size
    }
  }

  setAddlStageForm(addlStageForm: any){
    this.addlStageForm = addlStageForm
  }


  addAddlStageForm() {
    forEach(this.addlStageForm.value.infos,x => {
      if (this.aggFormData.init_appl_country == x.country){
        this.aggFormData.init_appl_details= {...this.aggFormData.init_appl_details, entity_size: x.entity_size}
      }
      if (this.aggFormData.pct_country == x.country){
        this.aggFormData.pct_method_customization.custom_appl_details=
          {...this.aggFormData.pct_method_customization.custom_appl_details,
            entity_size: x.entity_size}
      }
      this.addEntitySize(this.aggFormData.pct_countries, x)
      this.addEntitySize(this.aggFormData.ep_countries, x)
      this.addEntitySize(this.aggFormData.paris_countries, x)
      this.aggFormData.isa_country
    })
  }

  editApplOptions(data: { country: Country, appl_version: APPL_VERSIONS, appl_type: ApplType }) {
    this.customApplOptions.emit({
      'country': data.country,
      'appl_version': data.appl_version,
      'appl_type': data.appl_type
    })
  }

  editApplCustomApplDetails(data: { country: Country, appl_version: APPL_VERSIONS, appl_type: ApplType }) {
    this.customAppl.emit({'country': data.country, 'appl_version': data.appl_version, 'appl_type': data.appl_type})
  }

  updateData() {
    this.filterParisCountries()
    this.filterPCTROCountries()
    this.filterPCTAcceptCountries()
    this.filterEPCountries()
    this.detFinalButtons()
    this.blockOutCountries()
  }


  filterParisCountries() {
    if (this.aggFormData.ep_method) {
      this.paris_countries = this.countries.filter(x => x.country != 'IB')
    } else {
      this.paris_countries = filter(this.countries, x => {
        return x.country != 'EP' && x.country != 'IB'
      })
    }
  }

  filterPCTROCountries() {
    this.pct_ro_countries = this.countries.filter(y => y.pct_ro_bool)
  }

  filterPCTAcceptCountries() {
    if (this.aggFormData.ep_method) {
      this.pct_accept_countries = this.countries.filter(x => x.pct_accept_bool)
    } else {
      this.pct_accept_countries = filter(this.countries, x => {
        return x.country != 'EP' && x.pct_accept_bool
      })
    }
  }

  filterEPCountries() {
    this.ep_countries = this.countries.filter(x => x.ep_bool)
  }

  addlInfoChecker() {
    let unique_country_list = this.getUniqueCountryList()
    let entity_required_list = filter(unique_country_list, x => {
      return some(this.entitySizes, y => x.id == y.country)
    })
    if (entity_required_list.length > 0) {
      this.addlInfoFormRequired = true
    } else {
      this.addlInfoFormRequired = false
    }
    this.addlCountries = entity_required_list
  }

  getUniqueCountryList() {
    let unique_countries_list: Country[] = []
    let init_country = this.aggFormData.init_appl_country
    if (init_country) {
      unique_countries_list.push(init_country)
    }
    let pct_country = this.aggFormData.pct_country
    if (pct_country) {
      if (!some(unique_countries_list, x => x == pct_country)) {
        unique_countries_list.push(pct_country)
      }
    }
    let paris_countries = this.aggFormData.paris_countries
    forEach(paris_countries, country_item => {
      if (!some(unique_countries_list, x => x == country_item.country)) {
        unique_countries_list.push(country_item.country)
      }
    })
    let ep_countries = this.aggFormData.ep_countries
    forEach(ep_countries, country_item => {
      if (!some(unique_countries_list, x => x == country_item.country)) {
        unique_countries_list.push(country_item.country)
      }
    })
    let pct_countries = this.aggFormData.pct_countries
    forEach(pct_countries, country_item => {
      if (!some(unique_countries_list, x => x == country_item.country)) {
        unique_countries_list.push(country_item.country)
      }
    })
    return unique_countries_list
  }

  detFinalButtons() {
    this.addlInfoChecker()
    if (this.addlInfoFormRequired) {
      this.finalStep = this.FINAL_STEPS.ADDL_STAGE
    } else if (this.aggFormData.ep_method) {
      this.finalStep = this.FINAL_STEPS.EP_STAGE
    } else if (this.aggFormData.pct_method) {
      this.finalStep = this.FINAL_STEPS.PCT_STAGE
    } else {
      this.finalStep = this.FINAL_STEPS.PARIS_STAGE
    }
  }

  blockOutCountries() {
    this.blockedParisCountries = []
    this.blockedPCTCountry = new Country()
    if (this.aggFormData.init_appl_type.application_type == 'utility') {
      this.blockedParisCountries.push(this.aggFormData.init_appl_country)
      this.blockedEPValidCountries.push(this.aggFormData.init_appl_country)
      this.blockedPCTAcceptCountries.push(this.aggFormData.init_appl_country)
    } else if (this.aggFormData.init_appl_type.application_type == 'pct') {
      this.blockedPCTCountry = this.aggFormData.init_appl_country
    } else if (this.aggFormData.init_appl_type.application_type == 'ep') {
      this.blockedParisCountries.push(this.country_ep)
      this.blockedEPValidCountries.push(this.country_ep)
      this.blockedPCTAcceptCountries.push(this.country_ep)
    }
  }

  setIntlStageFormComplete(intlStageValid: boolean) {
    this.internationalStageFormComplete = intlStageValid
  }
}

