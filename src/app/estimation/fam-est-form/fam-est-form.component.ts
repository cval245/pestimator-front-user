import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {FamEstForm} from '../_models/FamEstForm.model';
import {ApplType} from '../../characteristics/_models/applType.model';
import {Country} from '../../characteristics/_models/Country.model';
import {EntitySize} from '../../characteristics/_models/entitySize.model';


@Component({
  selector: 'app-fam-est-form',
  templateUrl: './fam-est-form.component.html',
  styleUrls: ['./fam-est-form.component.scss']
})
export class FamEstFormComponent implements OnInit {
  @Input() applTypes: ApplType[] = [new ApplType(0, '', '', [0])];
  @Input() countries: Country[];
  @Input() pct_ro_countries: Country[];
  @Input() pct_accept_countries: Country[];
  @Input() ep_countries: Country[];
  @Input() paris_basic_countries: Country[];
  @Input() entitySizes: EntitySize[];
  @Output() formData = new EventEmitter;
  public aggFormData: FamEstForm;
  public interOption: Boolean = true;
  public epOption: Boolean = true;
  public isEditable;
  public familyForm: FormGroup;
  public firstApplForm: FormGroup;
  public internationalStageForm: FormGroup;
  public epStageForm: FormGroup;
  public parisStageForm: FormGroup;
  public applTypesCorrect: ApplType[] = [new ApplType(0, '', '', [0])];
  isa_countries: Country[] = [new Country(0, '', '', false, false, false, '', '', [0], [0], [0])];
  private removeInitApplFromParisCountries: boolean = false;
  public paris_countries: Country[] = [new Country(0, '', '', false, false, false, '', '', [0], [0], [0])];
  public FINAL_STEPS = {
    PARIS_STAGE: "parisstage",
    EP_STAGE: "epstage",
    PCT_STAGE: "pctstage"
  }
  public finalStep = this.FINAL_STEPS.PARIS_STAGE

  constructor(private fb: FormBuilder,
              private cdRef: ChangeDetectorRef,
  ) {
    this.isEditable = true;
    this.aggFormData = new FamEstForm('',
      '', 0, '', 0, 0,
      0, 0, 0, 0,
      0, 0,
      false, 0, 0, '', false, 0,
      0, 0, 0);

    this.applTypes = [new ApplType(0, '', '', [0])];
    this.countries = [new Country(0, '', '', false, false, false, '', '', [0], [0], [0])];
    this.pct_ro_countries = [new Country(0, '', '', false, false, false, '', '', [0], [0], [0])];
    this.pct_accept_countries = [new Country(0, '', '', false, false, false, '', '', [0], [0], [0])];
    this.ep_countries = [new Country(0, '', '', false, false, false, '', '', [0], [0], [0])];
    this.paris_basic_countries = [new Country(0, '', '', false, false, false, '', '', [0], [0], [0])];
    this.entitySizes = [new EntitySize(0, '', '')];

    this.familyForm = this.fb.group({
      family_name: ['', Validators.required],
      family_no: ['', Validators.required],
      entity_size: ['', Validators.required]
    })
    this.firstApplForm = this.fb.group({
      country: [undefined, Validators.required],
      application_type: [{value: undefined, disabled: true}, Validators.required],
      date_filing: ['', Validators.required],
      num_claims: ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]+$')])],
      num_indep_claims: ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]+$')])],
      num_drawings: ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]+$')])],
      num_pages_desc: ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]+$')])],
      num_pages_claims: ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]+$')])],
      num_pages_drawings: ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]+$')])],
      pct_method: [false],
      ep_method: [false],
    }, {validators: this.ApplTypeCountryValidator()})
    this.internationalStageForm = this.fb.group({
      pct_country: [],
      isa_country: [],
      pct_countries: this.fb.array([], this.PCTFormValidator()),
    })
    this.epStageForm = this.fb.group({
      ep_countries: this.fb.array([], this.EPFormValidator()),
    })
    this.parisStageForm = this.fb.group({
      paris_countries: this.fb.array([]),
    })
    this.firstApplForm.controls.country.valueChanges.subscribe(country_id => {
      this.applTypesCorrect = this.applTypes.filter(applType => applType.country_set.some(countryId => countryId == country_id))
      if (country_id > 0) {
        this.firstApplForm.controls.application_type.enable()
      } else {
        this.firstApplForm.controls.application_type.disable()
      }
      this.blockOutParisCountries()
      this.filterParisCountries()
      // adjust other factors

      // if (country_id == this.countries.find(x => x.country == 'EP')!.id) {
      //   this.pct_countries = this.pct_countries.filter(x => x != this.countries.find(y => y.country == 'EP'))
      // }
    })
    this.internationalStageForm.controls.pct_country.valueChanges.subscribe(country_id => {
      let country = this.countries.find(x => x.id == country_id)
      if (country !== undefined && country !== null) {
        this.isa_countries = this.countries.filter(x => country!.isa_countries.some(y => y == x.id))
      }
    })
    this.firstApplForm.controls.ep_method.valueChanges.subscribe(x => {
      this.filterParisCountries()
      this.autoSelectEP()
      this.detFinalButtons()
      if (x) {
        this.epStageForm.controls.ep_countries.setValidators([Validators.required])
      } else {
        this.epStageForm.controls.ep_countries.setValidators([])
      }
    })
    this.firstApplForm.controls.pct_method.valueChanges.subscribe(x => {
      this.filterParisCountries()
      this.autoSelectEP()
      this.detFinalButtons()
      if (x) {
        let bob = this.internationalStageForm.get('pct_country') as FormControl
        bob.add([])
        this.internationalStageForm.controls.pct_country.addValidators([Validators.required])
        this.internationalStageForm.controls.isa_country.addValidators([Validators.required])
        this.internationalStageForm.controls.pct_countries.addValidators([Validators.required])
      } else {
        this.internationalStageForm.controls.pct_country.setValidators([])
        this.internationalStageForm.controls.isa_country.setValidators([])
        this.internationalStageForm.controls.pct_countries.setValidators([])
      }
    })
  }

  detFinalButtons() {
    if (this.firstApplForm.controls.ep_method.value) {
      this.finalStep = this.FINAL_STEPS.EP_STAGE
    } else if (this.firstApplForm.controls.pct_method.value) {
      this.finalStep = this.FINAL_STEPS.PCT_STAGE
    } else {
      this.finalStep = this.FINAL_STEPS.PARIS_STAGE
    }
  }

  autoSelectEP() {
    const checkArray: FormArray = this.parisStageForm.get('paris_countries') as FormArray;
    if (this.firstApplForm.controls.ep_method.value
      && !this.firstApplForm.controls.pct_method.value) {
      console.log('sdfgggg', this.countries.find(x => x.country == 'EP'))
      checkArray.push(new FormControl({
        value: this.countries.find(x => x.country == 'EP')!.id,
        disabled: true
      }));
    } else {
      console.log('sdggggssss', checkArray.controls.some(x => x.value == this.countries.find(y => y.country == 'EP')!.id))
      if (checkArray.controls.some(x => x.value == this.countries.find(y => y.country == 'EP')!.id)) {
        let i: number = 0;
        checkArray.controls.forEach((item: AbstractControl) => {
          console.log('item.value', item.value)
          if (item.value == this.countries.find(x => x.country == 'EP')!.id) {
            checkArray.at(i).enable();
            checkArray.removeAt(i);
            return;
          }
          i++;
        })
      }
    }
  }

  filterParisCountries() {
    this.paris_countries = this.paris_basic_countries
    if (!this.firstApplForm.controls.ep_method.value) {
      this.paris_countries = this.paris_countries.filter((x: Country) => x.country != 'EP')
    }
    // if (!this.firstApplForm.controls.pct_method.value) {
    //   let cur_par_countries = this.parisStageForm.controls.paris_countries.value
    //   this.paris_countries = this.paris_countries.filter((x: Country)=> x.country != 'IB')
    // }
    // this.cdRef.detectChanges()
  }

  blockOutParisCountries() {
    this.removeInitApplFromParisCountries = false
    const checkArray: FormArray = this.parisStageForm.get('paris_countries') as FormArray;
    // checkArray.clear()
    let i: number = 0;
    checkArray.controls.forEach((item: AbstractControl) => {
      if (item.disabled) {
        checkArray.at(i).enable();
        checkArray.removeAt(i);
        return;
      }
      i++;
    })


    if (this.firstApplForm.controls.application_type.value !== undefined) {
      if (this.firstApplForm.controls.application_type.value
        == this.applTypes.find(x => x.application_type == 'utility')!.id
        || this.firstApplForm.controls.application_type.value
        == this.applTypes.find(x => x.application_type == 'pct')!.id
      ) {
        console.log('sssdsfff', this.firstApplForm.controls.country.value)
        checkArray.push(new FormControl({
          value: this.firstApplForm.controls.country.value,
          disabled: true
        }));
        this.removeInitApplFromParisCountries = true
        // this.parisStageForm.controls.paris_countries.patchValue({value: [this.firstApplForm.controls.country.value]})
      }
    }
  }

  ngOnInit(): void {
    // if(this.firstApplForm.get('application_type') !== null){
    this.firstApplForm.controls.application_type.valueChanges.subscribe((applType) => {
      this.setInternationalMethod()
      this.firstApplForm.controls.ep_method.enable()
      this.firstApplForm.controls.pct_method.enable()
      this.internationalStageForm.controls.pct_country.enable()
      this.firstApplForm.patchValue({ep_method: false})
      this.firstApplForm.patchValue({pct_method: false})
            this.internationalStageForm.controls.pct_country.reset()
            if (applType == this.applTypes.find(x => x.application_type == 'ep')!.id) {
              this.firstApplForm.patchValue({ep_method: true})
              this.firstApplForm.controls.ep_method.disable()

            } else if (applType == this.applTypes.find(x => x.application_type == 'pct')!.id) {
              this.firstApplForm.patchValue({pct_method: true})
              this.firstApplForm.controls.pct_method.disable()
              this.internationalStageForm.patchValue({
                pct_country: this.firstApplForm.controls.country.value
              })
              this.internationalStageForm.controls.pct_country.disable()
            }
      this.blockOutParisCountries()
          })
    // }
    }

  ngOnChanges(): void {
    // console.log('this_ro_countries', this.pct_ro_countries)
    // console.log('this_accept_countries', this.pct_accept_countries)
    // console.log('this_countries', this.countries)
    console.log('this.countr', this.countries.length)
    this.paris_countries = this.paris_basic_countries
    console.log('this.paris', this.paris_countries)
    this.filterParisCountries()

  }

  onPCTCheckboxChange(e: any, country_id: number) {
    const checkArray: FormArray = this.internationalStageForm.get('pct_countries') as FormArray;
    this.onCheckBoxChange(e, country_id, checkArray)
  }

  onEPCheckboxChange(e: any, country_id: number) {
    const checkArray: FormArray = this.epStageForm.get('ep_countries') as FormArray;
    this.onCheckBoxChange(e, country_id, checkArray)
  }

  onParisCheckboxChange(e: any, country_id: number) {
    const checkArray: FormArray = this.parisStageForm.get('paris_countries') as FormArray;
    this.onCheckBoxChange(e, country_id, checkArray)
  }

  onCheckBoxChange(e: any, country_id: number, checkArray: FormArray) {
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

  getCountriesFormCtrlNamePCT(country_id: number) {
    const checkArray: FormArray = this.internationalStageForm.get('pct_countries') as FormArray;
    return this.getCountriesFormCtrlName(country_id, checkArray)
  }

  getCountriesFormCtrlNameEP(country_id: number) {
    const checkArray: FormArray = this.epStageForm.get('ep_countries') as FormArray;
    return this.getCountriesFormCtrlName(country_id, checkArray)
  }

  getCountriesFormCtrlNameParis(country_id: number) {
    const checkArray: FormArray = this.parisStageForm.get('paris_countries') as FormArray;
    return this.getCountriesFormCtrlName(country_id, checkArray)
  }

  getCountriesFormCtrlName(country_id: number, checkArray: FormArray) {
    let ctrl = checkArray.controls.find(x => x.value == country_id) as FormControl
    if (ctrl == undefined) {
      return new FormControl()
    }
    return ctrl
  }


  onSubmit() {
    console.log('this.familyForm', this.familyForm.valid)
    console.log('this.first', this.firstApplForm.valid)
    console.log('this.internationSTageForm', this.internationalStageForm.valid)
    console.log('this.epStageForm', this.epStageForm.valid)
    if (this.removeInitApplFromParisCountries) {
      const checkArray: FormArray = this.parisStageForm.get('paris_countries') as FormArray;
      let init_country = this.firstApplForm.controls.country.value
      let i: number = 0;
      checkArray.controls.forEach((item: AbstractControl) => {
        if (item.value == init_country) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      })
    }
    if (this.familyForm.valid && this.firstApplForm.valid
      // && (this.internationalStageForm.valid || !this.firstApplForm.controls.pct_method )
      && this.internationalStageForm.valid
      && this.epStageForm.valid
      && this.parisStageForm.valid) {
      this.aggFormData = new FamEstForm('',
        '', 0, '', 0, 0,
        0, 0, 0, 0, 0, 0,
        false, 0, 0, '', false, 0, 0, 0, 0);

      // Family Details
      this.aggFormData.family_name = this.familyForm.controls.family_name.value
      this.aggFormData.family_no = this.familyForm.controls.family_no.value
      this.aggFormData.entity_size = this.familyForm.controls.entity_size.value

      // Initial Application
      this.aggFormData.init_appl_filing_date = this.firstApplForm.controls.date_filing.value
      this.aggFormData.init_appl_country = this.firstApplForm.controls.country.value
      this.aggFormData.init_appl_type = this.firstApplForm.controls.application_type.value
      this.aggFormData.init_appl_drawings = this.firstApplForm.controls.num_drawings.value
      this.aggFormData.init_appl_pages_desc = this.firstApplForm.controls.num_pages_desc.value
      this.aggFormData.init_appl_pages_claims = this.firstApplForm.controls.num_pages_claims.value
      this.aggFormData.init_appl_pages_drawings = this.firstApplForm.controls.num_pages_drawings.value
      this.aggFormData.init_appl_claims = this.firstApplForm.controls.num_claims.value
      this.aggFormData.init_appl_indep_claims = this.firstApplForm.controls.num_indep_claims.value
      this.aggFormData.pct_method = this.firstApplForm.controls.pct_method.value
      this.aggFormData.ep_method = this.firstApplForm.controls.ep_method.value

      // International Stage Form
      this.aggFormData.pct_country = this.internationalStageForm.controls.pct_country.value
      this.aggFormData.isa_country = this.internationalStageForm.controls.isa_country.value
      this.aggFormData.pct_countries = this.internationalStageForm.controls.pct_countries.value

      // EP Stage Form
      this.aggFormData.ep_countries = this.epStageForm.controls.ep_countries.value

      // Paris Stage form
      this.aggFormData.paris_countries = this.parisStageForm.controls.paris_countries.value

      // Emit
      this.formData.emit(this.aggFormData)
    }
  }


  formReset() {
    this.familyForm.reset();
    this.firstApplForm.reset()
    this.internationalStageForm.reset({pct_country: ''})
    let pct_frmArray = this.internationalStageForm.controls['pct_countries'] as FormArray;
    let ep_frmArray = this.epStageForm.controls['ep_countries'] as FormArray;
    let paris_frmArray = this.parisStageForm.controls['paris_countries'] as FormArray;
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
        // this.internationalStageForm.controls.pct_method.patchValue(false)
        this.internationalStageForm.controls.pct_country.patchValue('')
        // this.internationalStageForm.controls.ep_method.patchValue(false)
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
      // console.log('come one', control)
      const appl_type = control.get('application_type')
      const country = control.get('country')
      if (appl_type && country) {
        if (appl_type.value) {
          console.log('appl', appl_type.value)
          let applType = this.applTypes.find(x => x.id == appl_type.value)!
          if (applType.country_set) {
            return applType.country_set.some((x: number) => x == country.value) ? null : {InvalidApplType: true}
          }
        }
        return null
      }
      return null
    }
  }

  EPFormValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
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

}
