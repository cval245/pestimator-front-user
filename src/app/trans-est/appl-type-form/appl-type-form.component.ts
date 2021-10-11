import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ApplType} from "../../characteristics/_models/applType.model";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CountryAll} from "../../characteristics/_models/CountryAll.model";


@Component({
  selector: 'app-appl-type-form',
  templateUrl: './appl-type-form.component.html',
  styleUrls: ['./appl-type-form.component.scss']
})
export class ApplTypeFormComponent implements OnInit, OnChanges {

  @Input() country = new CountryAll(0,
    '', '', false,
    false, false, '', '', [0], [0])
  @Input() applTypes = [new ApplType(0, '', '', [0])]
  @Input() countries = [new CountryAll(0,
    '', '', false,
    false, false, '', '', [0], [0])]
  @Output() formEmitter = new EventEmitter()
  public form: FormGroup;
  public formActive: boolean = false;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      id: [0],
      country: [''],
      currency_name: [''],
      active_bool: [false],
      ep_bool: [false],
      pct_analysis_bool: [false],
      color: [''],
      long_name: [''],
      available_appl_types: this.fb.array([false]),
      isa_countries: this.fb.array([false]),
    })

  }

  ngOnInit(): void {
    this.form.disable()
  }

  ngOnChanges(): void {
    this.initForm()
  }

  initForm() {
    this.form.patchValue({
      id: this.country.id,
      country: this.country.country,
      currency_name: this.country.currency_name,
      active_bool: this.country.active_bool,
      ep_bool: this.country.ep_bool,
      pct_analysis_bool: this.country.pct_analysis_bool,
      color: this.country.color,
      long_name: this.country.long_name,
    })
    const checkArray: FormArray = this.form.get('available_appl_types') as FormArray;
    checkArray.reset()
    for (let applType_id of this.country.available_appl_types) {
      if (applType_id > 0) {
        checkArray.push(new FormControl(applType_id));
      }
    }
    const isaCheckArray: FormArray = this.form.get('isa_countries') as FormArray;
    isaCheckArray.reset()
    for (let country_id of this.country.isa_countries) {
      console.log('country_id', country_id)
      if (country_id > 0) {
        isaCheckArray.push(new FormControl(country_id));
      }
    }

  }


  onSubmit() {
    // this.form.patchValue({country: this.country.id})
    // const checkArray: FormArray = this.form.get('available_appl_types') as FormArray;
    //
    // let i: number = 0;
    // checkArray.controls.forEach((item: AbstractControl) => {
    //   if (item.value == null) {
    //     checkArray.removeAt(i);
    //     return;
    //   }
    //   i++;
    // });

    let formValues = this.form.value
    // formValues.available_appl_types =
    formValues.available_appl_types = formValues.available_appl_types.filter((item: number) => {
      return item != null
    })
    formValues.isa_countries = formValues.isa_countries.filter((item: number) => {
      return item != null
    })
    this.formEmitter.emit(formValues)
  }

  onISACheckboxChange(e: any, country_id: number) {
    const checkArray: FormArray = this.form.get('isa_countries') as FormArray;

    if (e.checked) {
      checkArray.push(new FormControl(country_id));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: AbstractControl) => {
        if (item.value == false) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }

  }

  onApplTypeCheckboxChange(e: any, applType_id: number) {
    const checkArray: FormArray = this.form.get('available_appl_types') as FormArray;

    if (e.checked) {
      checkArray.push(new FormControl(applType_id));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: AbstractControl) => {
        if (item.value == false) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }

  }

  getCountriesFormCtrlName(country_id: number) {
    const checkArray: FormArray = this.form.get('isa_countries') as FormArray;
    let ctrl = checkArray.controls.find(x => x.value == country_id) as FormControl
    if (ctrl == undefined) {
      return new FormControl()
    }
    return ctrl
  }

  getApplTypesFormCtrlName(applType_id: number) {
    const checkArray: FormArray = this.form.get('available_appl_types') as FormArray;
    let ctrl = checkArray.controls.find(x => x.value == applType_id) as FormControl
    if (ctrl == undefined) {
      return new FormControl()
    }
    return ctrl
  }

  toggleForm() {
    this.formActive = !this.formActive
    // const checkArray: FormArray = this.form.get('available_appl_types') as FormArray;
    if (this.formActive == true) {
      this.initForm()
      this.form.enable()
      // checkArray.enable()
    } else {
      this.initForm()
      this.form.disable()
      // checkArray.disable()
    }
  }
}
