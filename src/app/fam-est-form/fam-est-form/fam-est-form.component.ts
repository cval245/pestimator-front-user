import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {FamEstForm, multiCountry} from '../../_models/FamEstForm.model';
import {ApplType} from '../../_models/applType.model';
import {Country, CountryDetailsAdded} from '../../_models/Country.model';
import {EntitySize} from '../../_models/entitySize.model';
import {Subject} from "rxjs";
import {APPL_VERSIONS} from "../../estimation/enums";
import {CustomApplDetails} from "../../_models/CustomApplDetails.model";
import {cloneDeep, filter, find, forEach, isEqual, map, remove, some} from "lodash";
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
export class FamEstFormComponent implements OnDestroy, OnChanges {

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
  private aggFormValid: boolean = false
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
  private country_array: { country: Country, appl_versions: APPL_VERSIONS[] }[] = []
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
  public utilityChecker: boolean = false
  public singleUtilityForm: FormGroup = this.fb.group({
    double_countries: this.fb.array([])
  })
  public paris_country_remove: Country = new Country();
  public pct_country_remove: Country = new Country();
  public ep_country_remove: Country = new Country();
  public paris_country_add: Country = new Country();
  public paris_country_add_and_disable: Country = new Country();
  public pct_country_add: Country = new Country();
  public ep_prior_selection: FormControl = new FormControl()
  public epSingleEntryForm: boolean = false;
  public buttonDisabled: boolean = false;
  private ep_auto_selected: boolean = false;
  private applType_ep: ApplType = new ApplType();
  private applType_pct: ApplType = new ApplType();
  public pct_initial_appl_type: boolean = false
  public ep_initial_appl_type: boolean = false

  get doubleUtilityFormArray(): FormArray {
    return this.singleUtilityForm.controls.double_countries as FormArray
  }


  constructor(private fb: FormBuilder) {
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





  ngOnChanges(): void {
    if (this.applType_ep.id == 0) {
      let applType_ep = find(this.applTypes, applType => applType.application_type == 'ep')
      if (applType_ep) {
        this.applType_ep = applType_ep
      }
    }
    if (this.applType_pct.id == 0) {
      let applType_pct = find(this.applTypes, applType => applType.application_type == 'pct')
      if (applType_pct) {
        this.applType_pct = applType_pct
      }
    }
    this.parisCustomAppl = filter(this.allCustomDetails, x => x.appl_version == APPL_VERSIONS.PARIS_APPL)
    if (some(this.allCustomDetails, x => x.appl_version == APPL_VERSIONS.PCT_APPL)) {
      this.pctMethodCustomAppl = find(this.allCustomDetails, x => x.appl_version == APPL_VERSIONS.PCT_APPL)!
    }
    this.pctCustomAppl = filter(this.allCustomDetails, x => x.appl_version == APPL_VERSIONS.PCT_NAT_APPL)
    if (some(this.allCustomDetails, x => x.appl_version == APPL_VERSIONS.EP_APPL)) {
      this.epMethodCustomAppl = find(this.allCustomDetails, x => x.appl_version == APPL_VERSIONS.EP_APPL)!
    }
    this.epCustomAppl = filter(this.allCustomDetails, x => x.appl_version == APPL_VERSIONS.EP_VALID_APPL)
    if (this.countries.length > 0) {
      let country_ep = find(this.countries, x => x.country == 'EP')
      if (country_ep) {
        this.country_ep = country_ep
      }
    }
  }

  onSubmit() {
    if (this.addlStageForm) {
      this.addAddlStageForm()
    }
    let double_bool = this.verifyNoDoubleUtility()
    let ep_entry_missing = this.verifyEpPresent()
    if (double_bool) {
      this.utilityChecker = true
      this.aggFormValid = false
      this.buttonDisabled = true
    } else if (!ep_entry_missing) {
      this.epSingleEntryForm = true
      this.aggFormValid = false
      this.buttonDisabled = true
    } else {
      this.utilityChecker = false
      this.epSingleEntryForm = false
      this.aggFormValid = true

    }
    if (this.aggFormValid) {
      this.formData.emit(this.aggFormData)
    }
  }

  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
  }

  verifyNoDoubleUtility() {
    this.findDoubleUtilityCountries()
    let dbl_arr = this.doubleUtilityFormArray
    let double_bool = false
    forEach(this.country_array, country => {
      let new_control = this.fb.group({
        country: [country],
        appl_version: [null, Validators.required]
      })
      dbl_arr.push(new_control)
      double_bool = true
    })
    return double_bool
  }


  submitUtilityCorrections() {
    let remove_arr: number[] = []
    forEach(this.doubleUtilityFormArray.controls, (control, key) => {
      this.fixUtilityCorrections(control.value.country.country, control.value.appl_version)
      remove_arr.push(key)
    })
    forEach(remove_arr.sort((a, b) => b - a), index => {
      this.doubleUtilityFormArray.removeAt(index)
    })
    this.utilityChecker = false
    this.buttonDisabled = false
  }

  fixUtilityCorrections(country: Country, retain_appl_version: APPL_VERSIONS) {

    if (retain_appl_version != APPL_VERSIONS.PARIS_APPL) {
      let removed_country = remove(this.aggFormData.paris_countries, country_paris => {
        return isEqual(country_paris.country, country)
      })
      if (removed_country.length > 0) {
        this.paris_country_remove = removed_country[0].country
      }
    }
    if (retain_appl_version != APPL_VERSIONS.PCT_NAT_APPL) {
      let removed_country = remove(this.aggFormData.pct_countries, country_pct => {
        return isEqual(country_pct.country, country)
      })
      if (removed_country.length > 0) {
        this.pct_country_remove = removed_country[0].country
      }
    }
    if (retain_appl_version != APPL_VERSIONS.EP_VALID_APPL) {
      let removed_country = remove(this.aggFormData.ep_countries, country_ep => {
        return isEqual(country_ep.country, country)
      })
      if (removed_country.length > 0) {
        this.ep_country_remove = removed_country[0].country
      }
    }
  }


  pushToUtilityCountryArray(appl_version: APPL_VERSIONS, country: Country) {
    if (some(this.country_array, z => z.country == country)) {
      let c = find(this.country_array, z => z.country == country)!
      if (!some(c.appl_versions, x => x == appl_version)) {
        c.appl_versions.push(appl_version)
      }
    } else {
      this.country_array.push({'country': country, appl_versions: [appl_version]})
    }
  }

  findDoubleUtilityCountries() {
    this.country_array = []

    forEach(this.aggFormData.paris_countries, m_country_paris => {
      if (some(this.aggFormData.pct_countries, m_country_pct => {
        return isEqual(m_country_pct.country, m_country_paris.country)
      })) {
        this.pushToUtilityCountryArray(APPL_VERSIONS.PARIS_APPL, m_country_paris.country)
        this.pushToUtilityCountryArray(APPL_VERSIONS.PCT_NAT_APPL, m_country_paris.country)
      }
      if (some(this.aggFormData.ep_countries, m_country_ep => {
        return isEqual(m_country_ep.country, m_country_paris.country)
      })) {
        this.pushToUtilityCountryArray(APPL_VERSIONS.EP_VALID_APPL, m_country_paris.country)
        this.pushToUtilityCountryArray(APPL_VERSIONS.PCT_NAT_APPL, m_country_paris.country)
      }
    })
    forEach(this.aggFormData.pct_countries, m_country_pct => {
      if (some(this.aggFormData.ep_countries, m_country_ep => {
        return isEqual(m_country_ep.country, m_country_pct.country)
      })) {
        this.pushToUtilityCountryArray(APPL_VERSIONS.PCT_NAT_APPL, m_country_pct.country)
        this.pushToUtilityCountryArray(APPL_VERSIONS.EP_VALID_APPL, m_country_pct.country)
      }
    })
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

    this.ep_initial_appl_type = this.aggFormData.init_appl_type == this.applType_ep;
    this.pct_initial_appl_type = this.aggFormData.init_appl_type == this.applType_pct;
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

  addEntitySize(countries: any, x: any) {
    let pct_nat_country = find(countries, c => {
      return c.country == x.country
    })
    if (pct_nat_country) {
      pct_nat_country.custom_appl_details.entity_size = x.entity_size
    }
  }

  setAddlStageForm(addlStageForm: any) {
    this.addlStageForm = addlStageForm
  }


  addAddlStageForm() {
    forEach(this.addlStageForm.value.infos, x => {
      if (this.aggFormData.init_appl_country == x.country) {
        this.aggFormData.init_appl_details = {...this.aggFormData.init_appl_details, entity_size: x.entity_size}
      }
      if (this.aggFormData.pct_country == x.country) {
        this.aggFormData.pct_method_customization.custom_appl_details =
          {
            ...this.aggFormData.pct_method_customization.custom_appl_details,
            entity_size: x.entity_size
          }
      }
      this.addEntitySize(this.aggFormData.pct_countries, x)
      this.addEntitySize(this.aggFormData.ep_countries, x)
      this.addEntitySize(this.aggFormData.paris_countries, x)
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
    this.autoSelectEP()
  }

  autoSelectEP() {
    if (this.aggFormData.ep_method && this.aggFormData.init_appl_type != this.applType_ep) {
      if (!this.aggFormData.pct_method) {
        if (!some(this.aggFormData.paris_countries, y => y.country.id == this.country_ep.id)) {
          this.paris_country_add_and_disable = cloneDeep(this.country_ep)
          let ep_multi_country: multiCountry = {} as multiCountry
          ep_multi_country.country = this.country_ep
          ep_multi_country.custom_appl_details = new CustomApplDetails()
          ep_multi_country.custom_appl_options = new CustomApplOption()
          this.aggFormData.paris_countries.push(ep_multi_country)
          this.ep_auto_selected = true
        }
      } else {
        this.deSelectEP()
      }
    } else {
      this.deSelectEP()
    }
  }

  deSelectEP() {
    if (this.ep_auto_selected) {
      this.paris_country_remove = this.country_ep
      this.ep_auto_selected = false
      let bob = remove(this.aggFormData.paris_countries, country => country.country.id == this.country_ep.id)
      console.log('bob', bob)
    }
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
    this.addlInfoFormRequired = entity_required_list.length > 0;
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

  private verifyEpPresent() {
    let unique_country_list = this.getUniqueCountryList()
    return some(unique_country_list, y => isEqual(y, this.country_ep));

  }

  submitEPSelection() {
    this.epSingleEntryForm = false
    this.buttonDisabled = false
    if (this.ep_prior_selection.value == 'pct') {
      this.pct_country_add = this.country_ep
    } else {
      this.paris_country_add = this.country_ep
    }
  }
}

