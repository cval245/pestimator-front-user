import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {CustomApplOption} from "../../_models/CustomApplOptions.model";
import {ApplType} from "../../_models/applType.model";
import {CountryDetailsAdded} from "../../_models/Country.model";
import {Language} from "../../_models/Language.model";
import {takeUntil} from "rxjs/operators";
import {filter, find, some} from "lodash";
import {Subject} from "rxjs";
import {APPL_VERSIONS} from "../../estimation/enums";

@Component({
  selector: 'app-first-appl-form',
  templateUrl: './first-appl-form.component.html',
  styleUrls: ['./first-appl-form.component.scss']
})
export class FirstApplFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() applTypes: ApplType[] = [new ApplType()];
  @Input() countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  @Input() languages: Language[] = new Array<Language>()
  @Input() firstApplCustomOption: CustomApplOption = new CustomApplOption()
  @Output() customApplOptions = new EventEmitter;
  @Output() init_appl_form = new EventEmitter;
  public customApplOptionsToolTip: string = 'Customize Application Options';
  private destroyed = new Subject<void>()
  private userSelectedPCTMethod = false
  private userSelectedEPMethod = false
  public applTypesCorrect: ApplType[] = [new ApplType()];
  public filteredLanguages: Language[] = new Array<Language>()
  public initCustomApplDisabledBool: boolean = true;
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
    init_appl_options: [new CustomApplOption(), Validators.required]
  }, {validators: this.ApplTypeCountryValidator()});
  public selectableApplTypes: ApplType[] = new Array<ApplType>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.firstApplForm.valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(first_appl_form => {
        this.init_appl_form.emit(this.firstApplForm)
      })

    this.firstApplForm.controls.application_type.valueChanges
      .pipe(takeUntil(this.destroyed)).subscribe(appl_type => {
      this.filterLangs()
      if (appl_type) {
        this.initCustomApplDisabledBool = false
        if(!this.userSelectedEPMethod){
          this.firstApplForm.patchValue({ep_method: false})
        }
        if(!this.userSelectedPCTMethod){
          this.firstApplForm.patchValue({pct_method: false})
        }
        if (appl_type.application_type == 'pct'){
          this.firstApplForm.patchValue({pct_method: true})
          this.userSelectedPCTMethod = false
        } else if (appl_type.application_type == 'ep'){
          this.firstApplForm.patchValue({ep_method: true})
          this.userSelectedEPMethod = false
        }
      }
    })
    this.firstApplForm.controls.country.valueChanges
      .pipe(takeUntil(this.destroyed)).subscribe(country => {
      this.applTypesCorrect = this.selectableApplTypes.filter(applType => applType.country_set.some(countryId => countryId == country.id))
      if (this.firstApplForm.controls.application_type.value) {
        let avail_appl_types = this.firstApplForm.controls.country.value.available_appl_types
        let appl_type = this.firstApplForm.controls.application_type.value
        if (!avail_appl_types.includes(appl_type.id)) {
          this.firstApplForm.patchValue({application_type: undefined})
        }
      }
      if (country.id > 0) {
        this.firstApplForm.controls.application_type.enable()
      } else {
        this.firstApplForm.controls.application_type.disable()
        this.initCustomApplDisabledBool = true
      }
      // this.blockOutParisCountries()
      // this.blockOutPCTCountries()
      // this.blockOutEPCountries()
      // this.createParisCountriesControls()
      // this.createPctCountriesControls()
      // this.rectifyCustomDetails()
      this.filterLangs()
      // this.addlStageInfoChecker()
    })
  }

  ngOnChanges(): void {
    this.selectableApplTypes = filter(this.applTypes, x => !x.internal_bool)
  }

  ngOnDestroy(): void {
    this.destroyed.next()
    this.destroyed.complete()
  }

  filterLangs() {
    let country = this.firstApplForm.controls.country.value
    let applType = this.firstApplForm.controls.application_type.value
    this.firstApplForm.patchValue({language: null})
    if (country && applType !== undefined) {
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

  editInitApplOptions() {
    let country = this.firstApplForm.controls.country.value
    let appl_type = this.firstApplForm.controls.application_type.value

    let appl_version = APPL_VERSIONS.INIT_APPL
    this.customApplOptions.emit({'country': country, 'appl_version': appl_version, 'appl_type': appl_type})
  }

  userSelectedEPMethodTrue() {
    this.userSelectedEPMethod = true
  }
  userSelectedPCTMethodTrue() {
    this.userSelectedPCTMethod = true
  }
}
