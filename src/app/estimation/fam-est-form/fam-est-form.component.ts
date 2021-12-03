import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {FamEstForm} from '../_models/FamEstForm.model';
import {ApplType} from '../../characteristics/_models/applType.model';
import {Country, CountryDetailsAdded} from '../../characteristics/_models/Country.model';
import {EntitySize} from '../../characteristics/_models/entitySize.model';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {APPL_VERSIONS} from "../enums";
import {CustomApplDetails} from "../_models/CustomApplDetails.model";
import {filter, find, forEach, map, some} from "lodash";
import {CustomApplOptions} from "../_models/CustomApplOptions.model";
import {IDocFormat} from "../../characteristics/_models/DocFormat.model";
import {Language} from "../../characteristics/_models/Language.model";


@Component({
  selector: 'app-fam-est-form',
  templateUrl: './fam-est-form.component.html',
  styleUrls: ['./fam-est-form.component.scss']
})
export class FamEstFormComponent implements OnInit, OnDestroy {
  @Input() applTypes: ApplType[] = [new ApplType()];
  @Input() docFormats: IDocFormat[] = new Array<IDocFormat>()
  @Input() countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  @Input() languages: Language[] = new Array<Language>()
  @Input() pct_ro_countries: CountryDetailsAdded[] = [];
  @Input() pct_accept_countries: CountryDetailsAdded[] = [];
  @Input() ep_countries: CountryDetailsAdded[] = [];
  @Input() paris_basic_countries: CountryDetailsAdded[] = [];
  @Input() entitySizes: EntitySize[] = [new EntitySize()];
  @Input() allCustomDetails: [{
    country: Country, appl_type: ApplType, applVersion: APPL_VERSIONS,
    customDetails: CustomApplDetails, customOptions: CustomApplOptions
  }] = [{
    country: new Country(), applVersion: APPL_VERSIONS.PCT_APPL,
    appl_type: new ApplType(),
    customDetails: new CustomApplDetails(),
    customOptions: new CustomApplOptions()
  }];
  @Input() customOpt: CustomApplOptions = new CustomApplOptions();
  @Output() formData = new EventEmitter;
  @Output() customAppl = new EventEmitter;
  @Output() customApplOptions = new EventEmitter;
  trackByIndex = (index: number, country_obj: any) => country_obj.value.country.id;
  public customApplToolTip: string = 'Customize Application Details';
  public customApplOptionsToolTip: string = 'Customize Application Options';
  public filteredEntitySizes: EntitySize[] = [new EntitySize()];
  public filteredLanguages: Language[] = new Array<Language>()
  public aggFormData: FamEstForm = new FamEstForm();
  public interOption: Boolean = true;
  public epOption: Boolean = true;
  public isEditable = true;
  public defaultEntitySize: EntitySize = new EntitySize();
  // public default_entity_size = {} as EntitySize
  public familyForm: FormGroup = this.fb.group({
    family_name: ['', Validators.required],
    family_no: ['', Validators.required],
  });
  public firstApplForm: FormGroup = this.fb.group({
    country: [undefined, Validators.required],
    application_type: [{value: undefined, disabled: true}, Validators.required],
    date_filing: ['', Validators.required],
    num_claims: ['', Validators.compose([Validators.required,
      Validators.pattern('[0-9]+$')])],
    num_indep_claims: ['', Validators.compose([Validators.required,
      Validators.pattern('[0-9]+$')])],
    num_multiple_dependent_claims: ['', Validators.compose([Validators.required,
      Validators.pattern('[0-9]+$')])],
    num_drawings: ['', Validators.compose([Validators.required,
      Validators.pattern('[0-9]+$')])],
    num_pages_desc: ['', Validators.compose([Validators.required,
      Validators.pattern('[0-9]+$')])],
    num_pages_claims: ['', Validators.compose([Validators.required,
      Validators.pattern('[0-9]+$')])],
    num_pages_drawings: ['', Validators.compose([Validators.required,
      Validators.pattern('[0-9]+$')])],
    language: [null],
    entity_size: [null],
    pct_method: [false],
    ep_method: [false],
    init_appl_options: [new CustomApplOptions(), Validators.required]
  }, {validators: this.ApplTypeCountryValidator()});
  public internationalStageForm: FormGroup = this.fb.group({
    pct_country: [],
    pct_method_customization: [{'custom_appl_details':new CustomApplDetails(),
    'custom_appl_options': new CustomApplOptions()}],
    isa_country: [],
    pct_countries: this.fb.array([
    ], [
      this.PCTFormValidator(),
      ]
    ),
  });
  public epStageForm: FormGroup = this.fb.group({
    ep_entryPoint: [],
    ep_method_customization: [{'custom_appl_details':new CustomApplDetails(),
      'custom_appl_options': new CustomApplOptions()}],
    ep_countries:
      this.fb.array([
        ],
      [
        this.EPFormValidator(),
        this.EPHasEntryValidator(),
        this.EPHasOneEntryValidator(),
      ]),
  });
  public parisStageForm: FormGroup = this.fb.group({
    paris_countries: this.fb.array([
    ], ),
  });
  public singleUtilityForm: FormGroup = this.fb.group({
    double_countries: this.fb.array([])
  })
  public applTypesCorrect: ApplType[] = [new ApplType()];
  public isa_countries: CountryDetailsAdded[] = [];
  public paris_countries: CountryDetailsAdded[] = [];
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
  public addEntitySizeForm: FormGroup = this.fb.group({
    entity_size: this.fb.array([],)
  });
  private country_array: {country?: Country, appl_versions: APPL_VERSIONS[]}[] = [];
  public utilityChecker: boolean = false;


  constructor(private fb: FormBuilder) {

    this.firstApplForm.controls.country.valueChanges.pipe(takeUntil(this.destroyed)).subscribe(country => {
      this.applTypesCorrect = this.applTypes.filter(applType => applType.country_set.some(countryId => countryId == country.id))
      if (country.id > 0) {
        this.firstApplForm.controls.application_type.enable()
      } else {
        this.firstApplForm.controls.application_type.disable()
      }
      this.blockOutParisCountries()
      this.blockOutPCTCountries()
      this.blockOutEPCountries()
      this.createParisCountriesControls()
      this.rectifyCustomDetails()
      this.filterLangs()
      this.addlStageInfoChecker()
      // this.filterEntitySizes()
    })
    this.internationalStageForm.controls.pct_country.valueChanges.pipe(takeUntil(this.destroyed)).subscribe(country => {
      if (country !== undefined && country !== null) {
        this.isa_countries = this.countries.filter(x => country!.isa_countries.some((y: number) => y == x.id))
      }
      this.rectifyCustomDetails()
      this.addlStageInfoChecker()
    })
    this.internationalStageForm.controls.pct_countries.valueChanges.pipe(takeUntil(this.destroyed)).subscribe(country => {
      this.addlStageInfoChecker()
    })
    this.parisStageForm.controls.paris_countries.valueChanges.pipe(takeUntil(this.destroyed)).subscribe(country => {
      this.addlStageInfoChecker()
    })
    this.epStageForm.controls.ep_countries.valueChanges.pipe(takeUntil(this.destroyed)).subscribe(country => {
      this.addlStageInfoChecker()
    })
    this.firstApplForm.controls.ep_method.valueChanges.pipe(takeUntil(this.destroyed)).subscribe(x => {
      this.createParisCountriesControls()
      this.autoSelectEP()
      this.detFinalButtons()
      if (x) {
        this.epStageForm.controls.ep_countries.addValidators([Validators.required])
        this.epStageForm.controls.ep_countries.updateValueAndValidity()
      } else {
        this.epStageForm.controls.ep_countries.removeValidators([Validators.required])
        this.epStageForm.controls.ep_countries.updateValueAndValidity()
      }
      this.rectifyCustomDetails()
    })
    this.firstApplForm.controls.pct_method.valueChanges.pipe(takeUntil(this.destroyed)).subscribe(x => {
      this.createParisCountriesControls()
      this.autoSelectEP()
      this.detFinalButtons()
      if (x) {
        this.internationalStageForm.controls.pct_country.addValidators([Validators.required])
        this.internationalStageForm.controls.pct_country.updateValueAndValidity()
        this.internationalStageForm.controls.isa_country.addValidators([Validators.required])
        this.internationalStageForm.controls.isa_country.updateValueAndValidity()
        this.internationalStageForm.controls.pct_countries.addValidators([Validators.required])
        this.internationalStageForm.controls.pct_countries.updateValueAndValidity()
      } else {
        this.internationalStageForm.controls.pct_country.removeValidators([Validators.required])
        this.internationalStageForm.controls.pct_country.updateValueAndValidity()
        this.internationalStageForm.controls.isa_country.removeValidators([Validators.required])
        this.internationalStageForm.controls.isa_country.updateValueAndValidity()
        this.internationalStageForm.controls.pct_countries.removeValidators([Validators.required])
        this.internationalStageForm.controls.pct_countries.updateValueAndValidity()
      }
      this.rectifyCustomDetails()
    })
  }

  filterLangs() {
    let country = this.firstApplForm.controls.country.value
    let applType = this.firstApplForm.controls.application_type.value
    if (country && applType) {
      this.filteredLanguages = filter(this.languages, x => {
        return some(country.available_languages, y => {
          return y.language == x.id && y.appl_type == applType.id
        })
      })
      let default_language_id = find(country.available_languages, y => {
        return y.appl_type == applType.id && y.default
      }).language
      let default_language = find(this.languages, y => y.id == default_language_id)!
      this.firstApplForm.patchValue({language: default_language})
    }
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

  detFinalButtons() {
    let unique_country_list = this.getUniqueCountryList()
    if (unique_country_list.length > 0) {
      let entity_required_list = filter(unique_country_list, x => {
        return some(this.entitySizes, y => x.id == y.country)
      })
      // let entity_required_list = filter(unique_country_list, x => x.available_entity_sizes.length > 0)
      if (entity_required_list.length > 0) {
        this.finalStep = this.FINAL_STEPS.ADDL_STAGE
      } else if (this.firstApplForm.controls.ep_method.value) {
        this.finalStep = this.FINAL_STEPS.EP_STAGE
      } else if (this.firstApplForm.controls.pct_method.value) {
        this.finalStep = this.FINAL_STEPS.PCT_STAGE
      } else {
        this.finalStep = this.FINAL_STEPS.PARIS_STAGE
      }
    } else {
      this.finalStep = this.FINAL_STEPS.PARIS_STAGE
    }
  }

  autoSelectEP() {
    const checkArray: FormArray = this.parisCountriesFormArray
    if (this.firstApplForm.controls.ep_method.value
      && !this.firstApplForm.controls.pct_method.value) {
      let country_control = checkArray.controls.find(y => y.value.country == this.country_ep)
      if (country_control){
        country_control.patchValue({'selected': true})
        country_control.disable()
      }

    } else {
      let ep_control = checkArray.controls.find(y => y.value.country == this.country_ep)
      if (ep_control){
        ep_control.enable()
        ep_control.patchValue({'selected': false})
      }
    }
  }

  filterParisCountries() {
    this.paris_countries = this.paris_basic_countries
    if (!this.firstApplForm.controls.ep_method.value
      ) {
      this.paris_countries = this.paris_countries.filter((x: CountryDetailsAdded) => x != this.country_ep)
    }
  }

  blockOutParisCountries() {
    const checkArray: FormArray = this.parisCountriesFormArray
    let i: number = 0;
    checkArray.controls.forEach((item: AbstractControl) => {
      if (item.disabled) {
        if(checkArray.at(i).disabled){
          checkArray.at(i).enable();
          checkArray.at(i).patchValue({selected: false})
        }else{
          checkArray.at(i).enable();
        }
        return;
      }
      i++;
    })
    if (this.firstApplForm.controls.application_type.value !== undefined) {
      if (this.firstApplForm.controls.application_type.value.application_type == 'utility'
        || this.firstApplForm.controls.application_type.value.application_type == 'pct'
        || (this.firstApplForm.controls.country.value == this.country_ep
          && this.firstApplForm.controls.application_type.value.application_type == 'ep')
      ) {
        let country_control = checkArray.controls.find(y => y.value.country == this.firstApplForm.controls.country.value)
        if (country_control){
          country_control.patchValue({'selected': false})
          country_control.disable()
        }
      }
    }
  }
  blockOutPCTCountries() {
    const checkArray: FormArray = this.pctCountriesFormArray
    let i: number = 0;
    checkArray.controls.forEach((item: AbstractControl) => {
      if (item.disabled) {
        if(checkArray.at(i).disabled){
          checkArray.at(i).enable();
          checkArray.at(i).patchValue({selected: false})
        }else{
          checkArray.at(i).enable();
        }
        return;
      }
      i++;
    })
    if (this.firstApplForm.controls.application_type.value !== undefined) {
      if (this.firstApplForm.controls.application_type.value.application_type == 'utility') {
        let country_control = checkArray.controls.find(y => y.value.country == this.firstApplForm.controls.country.value)
        if (country_control){
          country_control.patchValue({'selected': false})
          country_control.disable()
        }
      }
    }
  }
  blockOutEPCountries() {
    const checkArray: FormArray = this.epCountriesFormArray
    let i: number = 0;
    checkArray.controls.forEach((item: AbstractControl) => {
      if (item.disabled) {
        if(checkArray.at(i).disabled){
          checkArray.at(i).enable();
          checkArray.at(i).patchValue({selected: false})
        }else{
          checkArray.at(i).enable();
        }
        return;
      }
      i++;
    })
    if (this.firstApplForm.controls.application_type.value !== undefined) {
      if (this.firstApplForm.controls.application_type.value.application_type == 'utility') {
        let country_control = checkArray.controls.find(y => y.value.country == this.firstApplForm.controls.country.value)
        if (country_control){
          country_control.patchValue({'selected': false})
          country_control.disable()
        }
      }
    }
  }



  get parisCountriesFormArray(){
    return this.parisStageForm.controls.paris_countries as FormArray
  }
  get entitySizeFormArray(): FormArray{
    return this.addEntitySizeForm.get('entity_size') as FormArray
  }
  get doubleUtilityFormArray(): FormArray{
    return this.singleUtilityForm.controls.double_countries as FormArray
  }
  get pctCountriesFormArray(){
    return this.internationalStageForm.controls.pct_countries as FormArray
  }
  get epCountriesFormArray(){
    return this.epStageForm.controls.ep_countries as FormArray
  }
  ngOnInit(): void {
    this.firstApplForm.controls.application_type.valueChanges.pipe(takeUntil(this.destroyed)).subscribe((applType) => {
      this.setInternationalMethod()
      this.firstApplForm.controls.ep_method.enable()
      this.firstApplForm.controls.pct_method.enable()
      this.internationalStageForm.controls.pct_country.enable()
      this.firstApplForm.patchValue({ep_method: false})
      this.firstApplForm.patchValue({pct_method: false})
            this.internationalStageForm.controls.pct_country.reset()
            if (applType == this.applTypes.find(x => x.application_type == 'ep')) {
              this.firstApplForm.patchValue({ep_method: true})
              this.firstApplForm.controls.ep_method.disable()

            } else if (applType == this.applTypes.find(x => x.application_type == 'pct')) {
              this.firstApplForm.patchValue({pct_method: true})
              this.firstApplForm.controls.pct_method.disable()
              this.internationalStageForm.patchValue({
                pct_country: this.firstApplForm.controls.country.value
              })
              this.internationalStageForm.controls.pct_country.disable()
            }
      this.blockOutParisCountries()
      this.blockOutPCTCountries()
      this.blockOutEPCountries()
      this.filterLangs()
          })
    }

    createParisCountriesControls(){
      this.filterParisCountries()
      const checkArray: FormArray = this.parisCountriesFormArray
      forEach(this.paris_countries, x => {
        if(!some(checkArray.controls, control => {
          return control.value.country.id == x.id
        })){

          let new_control = this.fb.group({
            selected: false,
            country: x,
            custom_appl_details: [new CustomApplDetails()],
            custom_appl_options: [new CustomApplOptions()],
          })
          checkArray.push(new_control)
        }
      })
    }
  createPctCountriesControls(){
    const checkArray: FormArray = this.pctCountriesFormArray
    forEach(this.pct_accept_countries, x => {
      if(!some(checkArray.controls, control => {
        return control.value.country.id == x.id
      })){

        let new_control = this.fb.group({
          selected: false,
          country: x,
          custom_appl_details: [new CustomApplDetails()],
          custom_appl_options: [new CustomApplOptions()],
        })
        checkArray.push(new_control)
      }
    })
  }
  createEpCountriesControls(){
    const checkArray: FormArray = this.epCountriesFormArray
    forEach(this.ep_countries, x => {
      if(!some(checkArray.controls, control => {
        return control.value.country.id == x.id
      })){

        let new_control = this.fb.group({
          selected: false,
          country: x,
          custom_appl_details: [new CustomApplDetails()],
          custom_appl_options: [new CustomApplOptions()],
        })
        checkArray.push(new_control)
      }
    })
  }

  ngOnChanges(): void {
    if (this.customOpt){
      this.firstApplForm.patchValue({init_appl_options: this.customOpt})
    }
    if (this.allCustomDetails.length>1){
      forEach(this.allCustomDetails, x => {
        switch(x.applVersion){
          case APPL_VERSIONS.PCT_APPL:{
            this.internationalStageForm.patchValue({pct_method_customization: {'custom_appl_details': x.customDetails, 'custom_appl_options': x.customOptions}})
            break;}
          case APPL_VERSIONS.EP_APPL:{
            this.epStageForm.patchValue({ep_method_customization: {'custom_appl_details': x.customDetails,  'custom_appl_options': x.customOptions}})
            break;}
          case APPL_VERSIONS.PARIS_APPL: {
            let checkArray = this.parisCountriesFormArray
            let control = find(checkArray.controls, y => y.value.country.id == x.country.id)
            console.log('x', x)
            if (control) {
              control.patchValue({custom_appl_details: x.customDetails, custom_appl_options: x.customOptions})
            }
            break;
          }
          case APPL_VERSIONS.PCT_NAT_APPL:{
            let checkArray = this.pctCountriesFormArray
            let control = find(checkArray.controls, y => y.value.country.id == x.country.id)
            if (control){
              control.patchValue({custom_appl_details: x.customDetails, custom_appl_options: x.customOptions})
            }
            break;}
          case APPL_VERSIONS.EP_VALID_APPL:{
            let checkArray = this.epCountriesFormArray
            let control = find(checkArray.controls, y => y.value.country.id == x.country.id)
            if (control){
              control.patchValue({custom_appl_details: x.customDetails, custom_appl_options: x.customOptions})
            }
            break;}
        }
      })

    }
    if (this.countries.length>1) {
      this.country_ep = this.countries.find(x => x.country == 'EP')!
      this.createParisCountriesControls()
      this.createPctCountriesControls()
      this.createEpCountriesControls()
    }
    this.paris_countries = this.paris_basic_countries
    this.filterParisCountries()
    this.rectifyCustomDetails()
  }



  rectifyCustomDetails(){
    this.pctDisplayCustomCountries = this.createCustomCountryDetailsDisplay(this.aggFormData.pct_countries)
    this.parisDisplayCustomCountries = this.createCustomCountryDetailsDisplay(this.aggFormData.paris_countries)
    this.epDisplayCustomCountries = this.createCustomCountryDetailsDisplay(this.aggFormData.ep_countries)
    // this.verifyAggDataCountry()
    this.detFinalButtons()
  }

  onSubmit() {

    this.insertEntitySizes()
    if (this.firstApplForm.controls.ep_method.value) {
      if (this.firstApplForm.controls.country.value !== this.country_ep) {
        let ep_country_control = find(this.parisCountriesFormArray.controls, x => x.value.country == this.country_ep)
        //@ts-ignore
        ep_country_control.enable()
      }
      // this etc
      this.parisCountriesFormArray
    }
    console.log('fam', this.familyForm.valid)
    console.log('first', this.firstApplForm.valid)
    console.log('inter', this.internationalStageForm.valid)
    console.log('paris', this.parisStageForm.valid)
    console.log('epStage', this.epStageForm.valid)

    let double_bool = this.verifyNoDoubleUtility()
    if (double_bool){
      this.utilityChecker = true
    }else{

    if (this.familyForm.valid && this.firstApplForm.valid
      && this.internationalStageForm.valid
      && this.epStageForm.valid
      && this.parisStageForm.valid) {
      this.aggFormData = new FamEstForm()


      // Family Details
      this.aggFormData.family_name = this.familyForm.controls.family_name.value
      this.aggFormData.family_no = this.familyForm.controls.family_no.value

      // Initial Application
      this.aggFormData.init_appl_filing_date = this.firstApplForm.controls.date_filing.value
      this.aggFormData.init_appl_country = this.firstApplForm.controls.country.value
      this.aggFormData.init_appl_type = this.firstApplForm.controls.application_type.value
      this.aggFormData.init_appl_details = {
        'num_drawings': this.firstApplForm.controls.num_drawings.value,
        'num_pages_description': this.firstApplForm.controls.num_pages_desc.value,
        'num_pages_claims': this.firstApplForm.controls.num_pages_claims.value,
        'num_pages_drawings': this.firstApplForm.controls.num_pages_drawings.value,
        'num_claims': this.firstApplForm.controls.num_claims.value,
        'num_indep_claims': this.firstApplForm.controls.num_indep_claims.value,
        'num_claims_multiple_dependent': this.firstApplForm.controls.num_multiple_dependent_claims.value,
        'language': this.firstApplForm.controls.language.value,
        'entity_size': this.firstApplForm.controls.entity_size.value,
      }
      console.log('ttt', this.aggFormData.init_appl_details)
      this.aggFormData.init_appl_options = this.firstApplForm.controls.init_appl_options.value

      this.aggFormData.pct_method = this.firstApplForm.controls.pct_method.value
      this.aggFormData.pct_method_customization = this.internationalStageForm.controls.pct_method_customization.value
      this.aggFormData.ep_method = this.firstApplForm.controls.ep_method.value
      this.aggFormData.ep_method_customization = this.epStageForm.controls.ep_method_customization.value

      // International Stage Form
      this.aggFormData.pct_country = this.internationalStageForm.controls.pct_country.value
      this.aggFormData.isa_country = this.internationalStageForm.controls.isa_country.value
      // this.aggFormData.pct_countries = this.internationalStageForm.controls.pct_countries.value
      this.aggFormData.pct_countries = map(filter(this.internationalStageForm.controls.pct_countries.value, x => {
        return x.selected == true
      }), y => {
        return {'country': y.country, 'custom_appl_details': y.custom_appl_details, 'custom_appl_options': y.custom_appl_options}
      })
      // EP Stage Form
      // this.aggFormData.ep_countries = this.epStageForm.controls.ep_countries.value
      this.aggFormData.ep_countries = map(filter(this.epStageForm.controls.ep_countries.value, x => {
        return x.selected == true
      }), y => {
        return {'country': y.country, 'custom_appl_details': y.custom_appl_details, 'custom_appl_options': y.custom_appl_options}
      })

      // Paris Stage form
      this.aggFormData.paris_countries = map(filter(this.parisStageForm.controls.paris_countries.value, x => {
        return x.selected == true
      }), y => {
        return {'country': y.country, 'custom_appl_details': y.custom_appl_details, 'custom_appl_options': y.custom_appl_options}
      })
      // Emit
      // this.addCustomApplDetails()
      this.formData.emit(this.aggFormData)
    }
    }
  }


  formReset() {
    this.familyForm.reset();
    this.firstApplForm.reset()
    this.internationalStageForm.reset({pct_country: ''})
    let pct_frmArray = this.pctCountriesFormArray
    let ep_frmArray = this.epCountriesFormArray
    let paris_frmArray = this.parisCountriesFormArray
    pct_frmArray.clear()
    ep_frmArray.clear()
    paris_frmArray.clear()
  }

  setInternationalMethod() {
    let form_value = this.firstApplForm.controls.application_type.value
    let c = this.applTypes.find(x => x.application_type == 'pct')
    if (c != undefined) {
      if (form_value == c.id) {
        this.interOption = false
        this.internationalStageForm.reset()
        this.internationalStageForm.controls.pct_country.patchValue('')
      } else {
        this.interOption = true
      }
    }
  }

  ApplTypeCountryValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const appl_type = control.get('application_type')
      const country = control.get('country')
      if (appl_type && country) {
        if (appl_type.value) {
          let applType = appl_type.value
          if (applType.country_set) {
            return applType.country_set.some((x: number) => x == country.value.id) ? null : {InvalidApplType: true}
          }
        }
        return null
      }
      return null
    }
  }

  EPFormValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value.length==0) {
        return null;
      }

      let ep_method = this.firstApplForm.get('ep_method')
      if (ep_method) {
        let epCountries = control.get('ep_countries')
        if (epCountries !== null)
          return epCountries.value.length > 0 ? null : {InvalidEPCountries: true}
      }
      return null
    }
  }
  EPHasEntryValidator(): ValidatorFn{
    // ensure that there is a entrypoint for the EP when ep method is selected
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value.length==0) {
        return null;
      }
      let ep_method = this.firstApplForm.get('ep_method')!.value
      if (ep_method) {
        let pct_frmArray = this.pctCountriesFormArray
        let paris_frmArray = this.parisCountriesFormArray
        //entry point init appl
        if (this.firstApplForm.controls.country.value){
          if (this.firstApplForm.controls.country.value == this.country_ep
            && this.firstApplForm.controls.application_type.value == this.applTypes.find(x => x.application_type == 'ep'))
            return null;
        }

        // entry point paris
        console.log(paris_frmArray.value)
        console.log(paris_frmArray.controls)
        if (paris_frmArray.controls.some((x: any) => {
          return (x.value.country == this.country_ep && x.value.selected)
        })) {
          return null;
        }
        // entry point pct
        if (pct_frmArray.controls.some((x: any) => {
          return (x.value.country == this.country_ep && x.value.selected)
        })) {
          return null;
        }
        return {EPNeedsEntryPoint: true}
      }
      return null
    }
  }

  EPHasOneEntryValidator(): ValidatorFn{
    // ensure that there is a entrypoint for the EP when ep method is selected
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value.length==0) {
        return null;
      }
      let ep_method = this.firstApplForm.get('ep_method')
      if (ep_method) {
        let pct_frmArray = this.pctCountriesFormArray
        let paris_frmArray = this.parisCountriesFormArray

        // NAND gate just don't want both to be true at same time
        if (!(paris_frmArray.value.some((x: any) => {
            return (x == this.country_ep && x.selected)
          })
          && pct_frmArray.value.some((x: any) => x == this.country_ep && x.selected))) {
          return null;
        }
        return {EPNeedsOnlyOneEntryPoint: true}
      }
      return null
    }
  }


  PCTFormValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      let pct_method = this.firstApplForm.get('pct_method')
      if (pct_method) {
        let pctCountries = control.get('pct_countries')
        if (pctCountries !== null)
          return pctCountries.value.length > 0 ? null : {InvalidPCTCountries: true}
      }
      return null
    }
  }

  ngOnDestroy(){
    this.destroyed.next()
    this.destroyed.complete()
}

  fixEPAncestor() {
    let formValue = this.epStageForm.controls.ep_entryPoint.value
    let ep_frmArray = this.epCountriesFormArray
    let pct_frmArray = this.pctCountriesFormArray
    let paris_frmArray = this.parisCountriesFormArray

    let ep_pct_control = pct_frmArray.controls.find((control: AbstractControl) => control.value.country == this.country_ep)
    let ep_paris_control = paris_frmArray.controls.find((control: AbstractControl) => control.value.country == this.country_ep)

    if (formValue == 'paris') {
      ep_pct_control!.patchValue({'selected': false})
      ep_paris_control!.patchValue({'selected': true})
    } else if (formValue == 'pct') {
      ep_paris_control!.patchValue({'selected': false})
      ep_pct_control!.patchValue({'selected': false})
    }
    ep_frmArray.updateValueAndValidity()
  }

  reValidateForms(event: any) {
    let ep_frmArray = this.epCountriesFormArray
    ep_frmArray.updateValueAndValidity()
  }

  editInitApplOptions() {
    let country = this.firstApplForm.controls.country.value
    let appl_type = this.firstApplForm.controls.application_type.value

    let appl_version = APPL_VERSIONS.INIT_APPL
    this.customApplOptions.emit({'country': country, 'appl_version': appl_version, 'appl_type': appl_type})
  }

  editApplCustomApplDetails(country: Country, appl_version: APPL_VERSIONS, appl_type: ApplType) {
    this.customAppl.emit({'country': country, 'appl_version': appl_version, 'appl_type': appl_type})
  }

  editParisCustApplDetails(country: Country) {
    let appl_type = this.applTypes.find(x => x.application_type == 'utility')!
    this.editApplCustomApplDetails(country, APPL_VERSIONS.PARIS_APPL, appl_type)
  }

  editPCTCustApplDetails() {
    let country = this.internationalStageForm.controls['pct_country'].value
    let appl_type = this.applTypes.find(x => x.application_type = 'pct')!
    this.editApplCustomApplDetails(country, APPL_VERSIONS.PCT_APPL, appl_type)
  }

  editPCTNatCustApplDetails(country: Country) {
    let appl_type = this.applTypes.find(x => x.application_type == 'pctnationalphase')!
    this.editApplCustomApplDetails(country, APPL_VERSIONS.PCT_NAT_APPL, appl_type)
  }

  editEPCustApplDetails() {
    let country = this.country_ep as unknown as Country
    // let country = this.countries.find(y => y == this.country_ep)!
    let appl_type = this.applTypes.find(x => x.application_type == 'ep')!
    this.editApplCustomApplDetails(country, APPL_VERSIONS.EP_APPL, appl_type)
  }

  editEPValidCustApplDetails(country: Country) {
    let appl_type = this.applTypes.find(x => x.application_type == 'epvalidation')!
    this.editApplCustomApplDetails(country, APPL_VERSIONS.EP_VALID_APPL, appl_type)
  }

  createCustomCountryDetailsDisplay(data: any) {
    return map(data, x => {
      x.country = find(this.countries, y => y.id == x.country)
      return x
    })
  }


  addEntitySizeFormControl(country: Country, entity_size: EntitySize
  ) {
    console.log('country', country)
    console.log('entitySize', entity_size)
    const entityArray: FormArray = this.entitySizeFormArray
    if (!some(entityArray.value, y => y.country == country)) {
      entityArray.push(this.patchValues(country, entity_size))
    }
    console.log('sss', entityArray)
  }

  patchValues(country: Country, entity_size: EntitySize) {
    return this.fb.group({
      country: [country],
      entity_size: [entity_size || null],
    })
  }

  getUniqueCountryList(){
    let unique_countries_list: Country[] = []
    let init_country = this.firstApplForm.get('country')?.value
    if (init_country){
      unique_countries_list.push(init_country)
    }
    let pct_country = this.internationalStageForm.get('pct_country')?.value
    if (pct_country){
      if (!some(unique_countries_list, x => x == pct_country)){
        unique_countries_list.push(pct_country)
      }
    }

    let paris_countries = this.parisCountriesFormArray.value
    if (paris_countries.length > 0) {
      for (let country_item of filter(paris_countries, y => y.selected == true)) {
        if (!some(unique_countries_list, x => x == country_item.country)) {
          unique_countries_list.push(country_item.country)
        }
      }
    }
    let ep_countries = this.epCountriesFormArray.value
    if (ep_countries.length > 0) {
      for (let country_item of filter(ep_countries, y => y.selected == true) ){
        if (!some(unique_countries_list, x => x == country_item.country)) {
          unique_countries_list.push(country_item.country)
        }
      }
    }
    let pct_countries = this.pctCountriesFormArray.value
    if (pct_countries.length > 0) {
      for (let country_item of filter(pct_countries, y => y.selected == true)) {
        if (!some(unique_countries_list, x => x == country_item.country)) {
          unique_countries_list.push(country_item.country)
        }
      }
    }
    return unique_countries_list
  }

  addlStageInfoChecker() {
    let unique_country_list = this.getUniqueCountryList()
    // create list of unique countries
    if (unique_country_list.length > 0) {
      let entity_required_list = filter(unique_country_list, x => {
        return some(this.entitySizes, y => x.id == y.country)
      })
      // let entity_required_list = filter(unique_country_list, x => x.available_entity_sizes.length > 0)
      console.log('x.available', entity_required_list)
      if (entity_required_list.length > 0) {
        forEach(entity_required_list, x => {
          let default_entity_size = this.findDefaultEntitySize(x)
          this.addEntitySizeFormControl(x, default_entity_size)
        })
        // this.finalStep = this.FINAL_STEPS.ADDL_STAGE
      }
      this.detFinalButtons()
    }
  }

  insertEntitySizes(){
    // edit their custom appl details
    // add entity size
    // let entValues = this.addEntitySizeForm.value
    let entitySizeFormArray = this.entitySizeFormArray
    let entValues = entitySizeFormArray.value
    forEach(entValues, x => {
      let init_country = this.firstApplForm.get('country')
      if (init_country) {
        if (init_country.value.id == x.country.id) {
          this.firstApplForm.patchValue({entity_size: x.entity_size})
        }
      }
      let pct_country = this.internationalStageForm.get('pct_country')?.value
      if (pct_country){
        if (pct_country.custom_appl_details == x.country){
          pct_country.custom_appl_details.entity_size = x.entity_size
        }
      }

      let paris_countries = this.parisCountriesFormArray.controls
      let country = find(paris_countries, y => y.value.country == x.country )
      if (country) {
        let custApplDetails = country.value.custom_appl_details
        custApplDetails = {...custApplDetails, entity_size: x.entity_size}
        country.patchValue({'custom_appl_details': custApplDetails})
      }
      let pct_countries = this.pctCountriesFormArray.controls
      country = find(pct_countries, y => y.value.country == x.country )
      if (country) {
        let custApplDetails = country.value.custom_appl_details
        custApplDetails = {...custApplDetails, entity_size: x.entity_size}
        country.patchValue({'custom_appl_details': custApplDetails})
      }
      let ep_countries = this.epCountriesFormArray.controls
      country = find(ep_countries, y => y.value.country == x.country )
      if (country) {
        let custApplDetails = country.value.custom_appl_details
        custApplDetails = {...custApplDetails, entity_size: x.entity_size}
        country.patchValue({'custom_appl_details': custApplDetails})
      }
    })
  }


  pushToUtilityCountryArray(appl_version: APPL_VERSIONS, country: Country) {
  if (some(this.country_array, z => z.country == country)) {
    let c = find(this.country_array, z => z.country == country)!
    if (!some(c.appl_versions, x => x == appl_version)){
      c.appl_versions.push(appl_version)
    }
  }else{
    this.country_array.push({'country': country, appl_versions: [appl_version]})
  }
  }

  findDoubleUtilityCountries(){
    this.country_array = []
    let init_country = this.firstApplForm.get('country')!.value
    let pct_frmArray = this.pctCountriesFormArray
    let paris_frmArray = this.parisCountriesFormArray
    let ep_frmArray = this.epCountriesFormArray

    let pct_array_selected = filter(pct_frmArray.controls, x => x.value.selected)
    let paris_array_selected = filter(paris_frmArray.controls, x => x.value.selected)
    let ep_array_selected = filter(ep_frmArray.controls, x => x.value.selected)

    //@ts-ignore
    forEach(paris_array_selected, (x: AbstractControl) => {
      if (some(pct_array_selected, (y: AbstractControl) => y.value.country == x.value.country)){
        this.pushToUtilityCountryArray(APPL_VERSIONS.PARIS_APPL, x.value.country)
        this.pushToUtilityCountryArray(APPL_VERSIONS.PCT_NAT_APPL, x.value.country)
      }
      if (some(ep_array_selected, (y: AbstractControl) => y.value.country == x.value.country)){
        this.pushToUtilityCountryArray(APPL_VERSIONS.PARIS_APPL, x.value.country)
        this.pushToUtilityCountryArray(APPL_VERSIONS.EP_VALID_APPL, x.value.country)
      }
    })

    //@ts-ignore
    forEach(pct_array_selected, (x: AbstractControl) => {
      if (some(ep_array_selected, (y: AbstractControl) => y.value.country == x.value.country)){
        this.pushToUtilityCountryArray(APPL_VERSIONS.EP_VALID_APPL, x.value.country)
        this.pushToUtilityCountryArray(APPL_VERSIONS.PCT_NAT_APPL, x.value.country)
      }
    })
    console.log('country_array', this.country_array)
  }
  countryArrayFinder(c: Country){
    console.log('ccc', c)
    return this.country_array.find(x => x.country == c)!.appl_versions
  }
  verifyNoDoubleUtility(){
    this.findDoubleUtilityCountries()
    let dbl_arr = this.doubleUtilityFormArray
    let double_bool=false
    forEach(this.country_array, x => {
      let new_control = this.fb.group({
        country: [x],
        appl_version: [null, Validators.required]
      })
      dbl_arr.push(new_control)
      double_bool=true
    })
    return double_bool
  }
  getUtilityRadioButtonParis(country: Country){
    // console.log('tedddhfhffheeeee', this.doubleUtilityFormArray.controls)
    // console.log('gggg', this.getUtilityRadioButton(country, APPL_VERSIONS.PARIS_APPL))
    return this.getUtilityRadioButton(country, APPL_VERSIONS.PARIS_APPL)
  }
  getUtilityRadioButtonPCTNAT(country: Country){
    return this.getUtilityRadioButton(country, APPL_VERSIONS.PCT_NAT_APPL)
  }
  getUtilityRadioButtonEPVALID(country: Country){
    return this.getUtilityRadioButton(country, APPL_VERSIONS.EP_VALID_APPL)
  }
  getUtilityRadioButton(country: Country, appl_version: APPL_VERSIONS){
    return some(find(this.country_array,y => {
      return y.country == country && some(y.appl_versions, z => z == appl_version)
    } ))
  }

  submitUtilityCorrections() {
  forEach(this.doubleUtilityFormArray.controls, y => {
      this.fixUtilityCorrections(y.value.country.country, y.value.appl_version)
    })
   this.utilityChecker = false
  }
  fixUtilityCorrections(country: Country, appl_version: APPL_VERSIONS){
    let paris_frmArray = this.parisCountriesFormArray
    let pct_frmArray = this.pctCountriesFormArray
    let ep_frmArray = this.epCountriesFormArray

    this.removeCountryFromForm(paris_frmArray, country, appl_version, APPL_VERSIONS.PARIS_APPL)
    this.removeCountryFromForm(pct_frmArray, country, appl_version, APPL_VERSIONS.PCT_NAT_APPL)
    this.removeCountryFromForm(ep_frmArray, country, appl_version, APPL_VERSIONS.EP_VALID_APPL)
  }
  removeCountryFromForm(frmArray: FormArray, country: Country, appl_version: APPL_VERSIONS, stage_appl_version: APPL_VERSIONS){
    if (frmArray) {
      let ctr = find(frmArray.controls, y => {
        return y.value.country == country
      })
      if (ctr) {
        console.log('ap', appl_version)
        console.log('ctr', ctr)
        if (appl_version == stage_appl_version) {
          ctr.patchValue({selected: true})
        } else {
          ctr.patchValue({selected: false})
        }
      }
    }
  }

}
