import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {CustomApplDetails} from "../../_models/CustomApplDetails.model";
import {CustomApplOption} from "../../_models/CustomApplOptions.model";
import {Country, CountryDetailsAdded} from "../../_models/Country.model";
import {APPL_VERSIONS} from "../../estimation/enums";
import {ApplType} from "../../_models/applType.model";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {find, forEach, isEqual, some} from "lodash";
import {ICustomDetail} from "../fam-est-form/fam-est-form.component";

@Component({
  selector: 'app-ep-stage-form',
  templateUrl: './ep-stage-form.component.html',
  styleUrls: ['./ep-stage-form.component.scss']
})
export class EpStageFormComponent implements OnInit, OnDestroy, OnChanges {

  @Input() applTypes: ApplType[] = [new ApplType()];
  @Input() countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  @Input() ep_countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  @Input() blockedEPValidCountries: Country[] = new Array<Country>()
  @Input() customApplDetails: ICustomDetail[] = new Array<ICustomDetail>()
  @Input() epCustom: ICustomDetail = {} as ICustomDetail
  @Input() ep_country_remove: Country = new Country()
  @Output() customAppl = new EventEmitter;
  @Output() epStage = new EventEmitter;
  public appl_type_ep: ApplType = new ApplType();
  public appl_type_utility: ApplType = new ApplType();
  public country_ep: CountryDetailsAdded = new CountryDetailsAdded()
  trackByIndex = (index: number, country_obj: any) => country_obj.value.country.id;
  public customApplToolTip: string = 'Customize Application Details';
  private destroyed = new Subject<void>()
  public customApplOptionsToolTip: string = 'Customize Application Options';
  public epStageForm: FormGroup = this.fb.group({
    ep_entryPoint: [],
    ep_method_customization: [{
      'custom_appl_details': new CustomApplDetails(),
      'custom_appl_options': new CustomApplOption()
    }],
    ep_countries:
      this.fb.array([],
        [
          // this.EPFormValidator(),
          // this.EPHasEntryValidator(),
          // this.EPHasOneEntryValidator(),
        ]),
  });

  constructor(private fb: FormBuilder) {
  }

  get epCountriesFormArray() {
    return this.epStageForm.controls.ep_countries as FormArray
  }

  ngOnInit(): void {
    this.epStageForm.valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.epStage.emit(this.epStageForm)
      })
  }

  ngOnDestroy(): void {
    this.destroyed.next()
    this.destroyed.complete()
  }

  ngOnChanges(): void {
    if (this.ep_country_remove.id != 0) {
      let ctrl = find(this.epCountriesFormArray.controls, control => {
        return isEqual(control.value.country, this.ep_country_remove)
      })
      if (ctrl) {
        ctrl.patchValue({selected: false})
        this.ep_country_remove = new Country()
      }
    }

    if (this.country_ep.id == 0) {
      this.country_ep = this.countries.find(x => x.country == 'EP')!
    }
    if (this.appl_type_ep.id == 0) {
      this.appl_type_ep = this.applTypes.find(x => x.application_type == 'ep')!
    }
    this.createEpCountriesControls()
    this.blockOutCountries()
    if (this.epCustom) {
      if (this.epCustom.customDetails && this.epCustom.customOptions) {
        let ep_meth = this.epStageForm.get('ep_method_customization')
        if (ep_meth) {
          let custom_details = ep_meth.value.custom_appl_details
          let custom_options = ep_meth.value.custom_appl_options
          if (this.epCustom.customDetails != custom_details
            || this.epCustom.customOptions != custom_options) {
            this.epStageForm.patchValue({
              ep_method_customization:
                {
                  custom_appl_details: this.epCustom.customDetails,
                  custom_appl_options: this.epCustom.customOptions
                }
            })
          }
        }
      }
    }
    if (this.appl_type_utility.id == 0) {
      if (some(this.applTypes, x => x.application_type == 'utility')) {
        this.appl_type_utility = this.applTypes.find(x => x.application_type == 'utility')!
      }
    }
    forEach(this.customApplDetails, x => {
      let checkArray = this.epCountriesFormArray
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
  }

  editApplCustomApplDetails(country: Country, appl_version: APPL_VERSIONS, appl_type: ApplType) {
    this.customAppl.emit({'country': country, 'appl_version': appl_version, 'appl_type': appl_type})
  }

  editEPCustApplDetails() {
    let country = this.country_ep as unknown as Country
    let appl_type = this.applTypes.find(x => x.application_type == 'ep')!
    this.editApplCustomApplDetails(country, APPL_VERSIONS.EP_APPL, appl_type)
  }

  editEPValidCustApplDetails(country: Country) {
    let appl_type = this.applTypes.find(x => x.application_type == 'epvalidation')!
    this.editApplCustomApplDetails(country, APPL_VERSIONS.EP_VALID_APPL, appl_type)
  }

  createEpCountriesControls() {
    const checkArray: FormArray = this.epCountriesFormArray
    let removeArr: number[] = []
    forEach(checkArray.controls, (control, key) => {
      if (control) {
        if (!some(this.ep_countries, country => {
          return control.value.country.id == country.id
        })) {
          removeArr.push(key)
        }
      }
    })
    forEach(removeArr.sort((a, b) => b - a), x => {
      checkArray.removeAt(x)
    })
    forEach(this.ep_countries, x => {
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

  // EPFormValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (control.value.length == 0) {
  //       return null;
  //     }
  //
  //     let ep_method = this.firstApplForm.get('ep_method')
  //     if (ep_method) {
  //       let epCountries = control.get('ep_countries')
  //       if (epCountries !== null)
  //         return epCountries.value.length > 0 ? null : {InvalidEPCountries: true}
  //     }
  //     return null
  //   }
  // }
  //
  // EPHasEntryValidator(): ValidatorFn {
  //   // ensure that there is a entrypoint for the EP when ep method is selected
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (control.value.length == 0) {
  //       return null;
  //     }
  //     let ep_method = this.firstApplForm.get('ep_method')!.value
  //     if (ep_method) {
  //       let pct_frmArray = this.pctCountriesFormArray
  //       let paris_frmArray = this.parisCountriesFormArray
  //       //entry point init appl
  //       if (this.firstApplForm.controls.country.value) {
  //         if (this.firstApplForm.controls.country.value == this.country_ep
  //           && this.firstApplForm.controls.application_type.value == this.applTypes.find(x => x.application_type == 'ep'))
  //           return null;
  //       }
  //
  //       // entry point paris
  //       if (paris_frmArray.controls.some((x: any) => {
  //         return (x.value.country == this.country_ep && x.value.selected)
  //       })) {
  //         return null;
  //       }
  //       // entry point pct
  //       if (pct_frmArray.controls.some((x: any) => {
  //         return (x.value.country == this.country_ep && x.value.selected)
  //       })) {
  //         return null;
  //       }
  //       return {EPNeedsEntryPoint: true}
  //     }
  //     return null
  //   }
  // }
  //
  // EPHasOneEntryValidator(): ValidatorFn {
  //   // ensure that there is a entrypoint for the EP when ep method is selected
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (control.value.length == 0) {
  //       return null;
  //     }
  //     let ep_method = this.firstApplForm.get('ep_method')
  //     if (ep_method) {
  //       let pct_frmArray = this.pctCountriesFormArray
  //       let paris_frmArray = this.parisCountriesFormArray
  //
  //       // NAND gate just don't want both to be true at same time
  //       if (!(paris_frmArray.value.some((x: any) => {
  //           return (x == this.country_ep && x.selected)
  //         })
  //         && pct_frmArray.value.some((x: any) => x == this.country_ep && x.selected))) {
  //         return null;
  //       }
  //       return {EPNeedsOnlyOneEntryPoint: true}
  //     }
  //     return null
  //   }
  // }

  blockOutCountries() {
    if (this.blockedEPValidCountries.length > 0) {
      let checkArray = this.epCountriesFormArray
      forEach(checkArray.controls, (control: AbstractControl) => {
        if (some(this.blockedEPValidCountries, x => x == control.value.country)) {
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
