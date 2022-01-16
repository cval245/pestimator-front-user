import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomApplDetails} from "../../_models/CustomApplDetails.model";
import {CustomApplOption} from "../../_models/CustomApplOptions.model";
import {APPL_VERSIONS} from "../../estimation/enums";
import {Country, CountryDetailsAdded} from "../../_models/Country.model";
import {ApplType} from "../../_models/applType.model";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {filter, find, forEach, isEqual, some} from "lodash";
import {ICustomDetail} from "../fam-est-form/fam-est-form.component";

@Component({
  selector: 'app-international-stage-form',
  templateUrl: './international-stage-form.component.html',
  styleUrls: ['./international-stage-form.component.scss']
})
export class InternationalStageFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() applTypes: ApplType[] = [new ApplType()];
  @Input() pct_ro_countries: CountryDetailsAdded[] = [];
  @Input() pctAcceptCountries: CountryDetailsAdded[] = [];
  @Input() blockedPCTCountries: Country[] = new Array<Country>()
  @Input() blockedPCTCountry: Country = new Country()
  @Input() countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  @Input() customApplDetails: ICustomDetail[] = new Array<ICustomDetail>()
  @Input() pctMethodCustomDetails: ICustomDetail = {} as ICustomDetail
  @Input() pct_country_remove: Country = new Country()
  @Input() pct_country_add: Country = new Country();
  @Output() customAppl = new EventEmitter;
  @Output() intlStageForm = new EventEmitter;
  @Output() formValid = new EventEmitter;
  public isa_countries: CountryDetailsAdded[] = [];
  public customApplToolTip: string = 'Customize Application Details';
  public customApplOptionsToolTip: string = 'Customize Application Options';
  private destroyed = new Subject<void>()
  public appl_type_utility: ApplType = new ApplType();
  public appl_type_pct: ApplType = new ApplType();
  trackByIndex = (index: number, country_obj: any) => country_obj.value.country.id;

  public internationalStageForm: FormGroup = this.fb.group({
    pct_country: [Validators.required],
    pct_method_customization: [{
      'custom_appl_details': new CustomApplDetails(),
      'custom_appl_options': new CustomApplOption()
    }],
    isa_country: [Validators.required],
    pct_countries: this.fb.array([]),
  });
  private intlStageValid: boolean = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.internationalStageForm.valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        if (this.internationalStageForm) {
          this.intlStageForm.emit(this.internationalStageForm)
          this.PCTFormValidate()
        }
      })
    this.internationalStageForm.controls.pct_country.valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(country => {
        if (country !== undefined && country !== null) {
          this.isa_countries = this.countries.filter(x => country!.isa_countries.some((y: number) => y == x.id))
        }
        if (this.isa_countries.length == 1) {
          let isa_country = this.internationalStageForm.get('isa_country')
          if (isa_country) {
            if (isa_country.value != this.blockedPCTCountry) {
              this.internationalStageForm.patchValue({isa_country: this.isa_countries[0]})
            }
          }
        }
      })
  }

  ngOnChanges() {
    this.createPctCountriesControls()
    this.blockOutCountries()
    this.blockOutPCTRoCountry()
    if (this.appl_type_utility.id == 0) {
      if (some(this.applTypes, x => x.application_type == 'utility')) {
        this.appl_type_utility = this.applTypes.find(x => x.application_type == 'utility')!
      }
    }
    if (this.appl_type_pct.id == 0) {
      if (some(this.applTypes, x => x.application_type == 'pct')) {
        this.appl_type_pct = this.applTypes.find(x => x.application_type == 'pct')!
      }
    }
    if (this.pct_country_remove.id != 0) {
      let ctrl = find(this.pctCountriesFormArray.controls, control => {
        return isEqual(control.value.country, this.pct_country_remove)
      })
      if (ctrl) {
        ctrl.patchValue({selected: false})
        this.pct_country_remove = new Country()
      }
    }
    if (this.pct_country_add.id != 0) {
      let ctrl = find(this.pctCountriesFormArray.controls, control => {
        return isEqual(control.value.country, this.pct_country_add)
      })
      if (ctrl) {
        ctrl.patchValue({selected: true})
        this.pct_country_add = new Country()
      }
    }

    let customApplDetailsNatPhase = filter(this.customApplDetails, x => x.appl_version == APPL_VERSIONS.PCT_NAT_APPL)
    forEach(customApplDetailsNatPhase, x => {
      let checkArray = this.pctCountriesFormArray
      let control = find(checkArray.controls, y => y.value.country.id == x.country.id)
      if (control) {
        let custom_details = control.value.custom_appl_details
        let custom_options = control.value.custom_appl_options
        if (x.customDetails != custom_details || x.customOptions != custom_options) {
          control.patchValue({custom_appl_details: x.customDetails, custom_appl_options: x.customOptions})
          }
        }
      }
    )
    if (this.pctMethodCustomDetails) {
      if (this.pctMethodCustomDetails.customDetails && this.pctMethodCustomDetails.customOptions) {
        let pct_meth = this.internationalStageForm.get('pct_method_customization')
        if (pct_meth) {
          let custom_details = pct_meth.value.custom_appl_details
          let custom_options = pct_meth.value.custom_appl_options
          if (this.pctMethodCustomDetails.customDetails != custom_details
            || this.pctMethodCustomDetails.customOptions != custom_options) {
            this.internationalStageForm.patchValue({
              pct_method_customization:
                {
                  custom_appl_details: this.pctMethodCustomDetails.customDetails,
                  custom_appl_options: this.pctMethodCustomDetails.customOptions
                }
            })
          }
        }
      }
    }
  }

  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
  }

  get pctCountriesFormArray() {
    return this.internationalStageForm.controls.pct_countries as FormArray
  }

  editApplCustomApplDetails(country: Country, appl_version: APPL_VERSIONS, appl_type: ApplType) {
    this.customAppl.emit({'country': country, 'appl_version': appl_version, 'appl_type': appl_type})
  }

  editPCTCustApplDetails() {
    let country = this.internationalStageForm.controls['pct_country'].value
    // let appl_type = this.applTypes.find(x => x.application_type == 'pct')!
    this.editApplCustomApplDetails(country, APPL_VERSIONS.PCT_APPL, this.appl_type_pct)
  }

  editPCTNatCustApplDetails(country: Country) {
    let appl_type = this.applTypes.find(x => x.application_type == 'utility')!
    if (country.country == 'EP') {
      appl_type = this.applTypes.find(x => x.application_type == 'ep')!
    }
    this.editApplCustomApplDetails(country, APPL_VERSIONS.PCT_NAT_APPL, appl_type)
  }

  PCTFormValidate() {
    let intlStageValid = false
    if (this.internationalStageForm.valid) {
      if (some(this.pctCountriesFormArray.value, y => {
        return y.selected
      })) {
        intlStageValid = true
      }
    }
    if (this.intlStageValid != intlStageValid) {
      this.intlStageValid = intlStageValid
      this.formValid.emit(intlStageValid)
    }
  }

  createPctCountriesControls() {
    const checkArray: FormArray = this.pctCountriesFormArray
    let removeArr: number[] = []
    forEach(checkArray.controls, (control, key) => {
      if (control) {
        if (!some(this.pctAcceptCountries, country => {
          return control.value.country.id == country.id
        })) {
          removeArr.push(key)
        }
      }
    })
    forEach(removeArr.sort((a, b) => b - a), x => {
      checkArray.removeAt(x)
    })
    forEach(this.pctAcceptCountries, x => {
      if (!some(checkArray.controls, control => {
        return control.value.country.id == x.id
      })) {

        let new_control = this.fb.group({
          selected: false,
          country: x,
          custom_appl_details: [new CustomApplDetails()],
          custom_appl_options: [new CustomApplOption()],
        })
        checkArray.push(new_control)
      }
    })
  }

  blockOutPCTRoCountry() {
    let pct_country = this.internationalStageForm.get('pct_country')
    if (this.blockedPCTCountry.id != 0) {
      if (pct_country) {
        if (pct_country.value != this.blockedPCTCountry) {
          this.internationalStageForm.patchValue({pct_country: this.blockedPCTCountry})
          pct_country.disable()
        }
      }
    } else {
      if (pct_country?.disabled) {
        pct_country.enable()
      }
    }
  }

  blockOutCountries() {
    if (this.blockedPCTCountries.length > 0) {
      let checkArray = this.pctCountriesFormArray
      forEach(checkArray.controls, (control: AbstractControl) => {
        if (some(this.blockedPCTCountries, x => x == control.value.country)) {
          if (control.enabled) {
            control.disable()
            if (control.value.selected) {
              control.patchValue({selected: false})
            }
          }
        } else if (control.disabled) {
          control.enable()
        }
      })
    }
  }
}
