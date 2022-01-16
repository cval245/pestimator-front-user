import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder} from "@angular/forms";
import {Country} from "../../_models/Country.model";
import {APPL_VERSIONS} from "../../estimation/enums";
import {ApplType} from "../../_models/applType.model";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {find, forEach, isEqual, some, sortBy} from "lodash";
import {CustomApplDetails} from "../../_models/CustomApplDetails.model";
import {CustomApplOption} from "../../_models/CustomApplOptions.model";
import {ICustomDetail, IParisForm} from "../fam-est-form/fam-est-form.component";

@Component({
  selector: 'app-paris-stage-form',
  templateUrl: './paris-stage-form.component.html',
  styleUrls: ['./paris-stage-form.component.scss']
})
export class ParisStageFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() parisCountries: Country[] = new Array<Country>()
  @Input() blockedParisCountries: Country[] = new Array<Country>()
  @Input() applTypes: ApplType[] = [new ApplType()];
  @Input() customApplDetails: ICustomDetail[] = new Array<ICustomDetail>()
  @Input() paris_country_remove: Country = new Country()
  @Input() paris_country_add: Country = new Country()
  @Input() paris_country_add_and_disable: Country = new Country()
  @Output() customAppl = new EventEmitter;
  @Output() parisStage: EventEmitter<IParisForm> = new EventEmitter();
  private destroyed = new Subject<void>()
  trackByIndex = (index: number, country_obj: any) => country_obj.value.country.id;
  public customApplToolTip: string = 'Customize Application Details';
  public customApplOptionsToolTip: string = 'Customize Application Options';
  public parisStageForm: IParisForm = this.fb.group({
    paris_countries: this.fb.array([
      this.fb.group({
        selected: false,
        country: new Country(),
        custom_appl_details: [new CustomApplDetails()],
        custom_appl_options: [new CustomApplOption()],
      })],),
  });
  public appl_type_utility: ApplType = new ApplType();
  private formArrayLoaded: boolean = false

  constructor(private fb: FormBuilder){
  }

  ngOnInit(): void {
    this.parisStageForm.valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        if (this.parisCountriesFormArray){
          this.parisStage.emit(this.parisStageForm)
        }
      })
  }

  ngOnChanges() {
    this.createParisCountriesControls()
    this.blockOutCountries()
    if (this.appl_type_utility.id == 0) {
      if (some(this.applTypes, x => x.application_type == 'utility')) {
        this.appl_type_utility = this.applTypes.find(x => x.application_type == 'utility')!
      }
    }
    if (this.paris_country_remove.id != 0) {
      let ctrl = find(this.parisCountriesFormArray.controls, control => {
        return isEqual(control.value.country, this.paris_country_remove)
      })
      if (ctrl) {
        ctrl.enable()
        ctrl.patchValue({selected: false})
        this.paris_country_remove = new Country()
      }
    }
    if (this.paris_country_add.id != 0) {
      let ctrl = find(this.parisCountriesFormArray.controls, control => {
        return isEqual(control.value.country, this.paris_country_add)
      })
      if (ctrl) {
        ctrl.patchValue({selected: true})
        this.paris_country_add = new Country()
      }
    }
    if (this.paris_country_add_and_disable.id != 0) {
      let ctrl = find(this.parisCountriesFormArray.controls, control => {
        return isEqual(control.value.country, this.paris_country_add_and_disable)
      })
      if (ctrl) {
        ctrl.patchValue({selected: true})
        ctrl.disable()
        this.paris_country_add_and_disable = new Country()
      }
    }

    forEach(this.customApplDetails, x => {
      let checkArray = this.parisCountriesFormArray
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

  ngOnDestroy(): void {
    this.destroyed.next()
    this.destroyed.complete()
  }

  get parisCountriesFormArray() {
    return this.parisStageForm.controls.paris_countries as FormArray
  }

  editApplCustomApplDetails(country: Country, appl_version: APPL_VERSIONS, appl_type: ApplType) {
    this.customAppl.emit({'country': country, 'appl_version': appl_version, 'appl_type': appl_type})
  }

  editParisCustApplDetails(country: Country) {
    let appl_type = this.applTypes.find(x => x.application_type == 'utility')!
    this.editApplCustomApplDetails(country, APPL_VERSIONS.PARIS_APPL, appl_type)
  }

  createParisCountriesControls() {
    const checkArray: FormArray = this.parisCountriesFormArray
    this.parisCountries = sortBy(this.parisCountries, x => {
      return x.long_name
    })
    // let checkArray = cloneDeep(checkArray)
    let removeArr: number[] = []
    forEach(checkArray.controls, (control, key) => {
      if (control) {
        if (!some(this.parisCountries, country => {
          return control.value.country.id == country.id
        })) {
          removeArr.push(key)
        }
      }
    })
    forEach(removeArr.sort((a, b) => b - a), x => {
      checkArray.removeAt(x)
    })
    forEach(this.parisCountries, x => {
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
    this.formArrayLoaded = true
  }

  blockOutCountries(){
    if (this.blockedParisCountries.length > 0){
      let checkArray = this.parisCountriesFormArray
      forEach(checkArray.controls, (control: AbstractControl) => {
        if (some(this.blockedParisCountries, x => x == control.value.country)){
          if (control.enabled){
            control.disable()
            if (control.value.selected){
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
