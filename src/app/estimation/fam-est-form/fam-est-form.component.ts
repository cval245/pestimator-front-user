import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  @Input() applTypes: ApplType[] = [new ApplType(0, '', '')];
  @Input() countries: Country[];
  @Input() pct_countries: Country[];
  @Input() entitySizes: EntitySize[];
  @Output() formData = new EventEmitter;
  public aggFormData: FamEstForm;
  public interOption: Boolean = true;
  public isEditable;
  public familyForm: FormGroup;
  public firstApplForm: FormGroup;
  public internationalStageForm: FormGroup;
  public nationalPhaseForm: FormGroup;

  constructor(private fb: FormBuilder,
              private cdRef: ChangeDetectorRef,
  ) {
    this.isEditable = true;
    this.aggFormData = new FamEstForm('',
      '',0,'',0,0,
      0,0,0,0,0,0,
      false,0,'', false, 0);

    this.applTypes = [new ApplType(0, '', '')];
    this.countries = [new Country(0, '', '', false, false, '', '')];
    this.pct_countries = [new Country(0, '', '', false, false, '', '')];
    this.entitySizes = [new EntitySize(0, '','')];

    this.familyForm = this.fb.group({
      family_name: ['', Validators.required],
      family_no: ['', Validators.required],
      entity_size: ['', Validators.required]
    })
    this.firstApplForm = this.fb.group({
      country: ['', Validators.required],
      application_type: ['', Validators.required],
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
    })
    this.internationalStageForm = this.fb.group({
      method: [false],
      meth_country: [],
      ep_method: [false],
    })
    this.nationalPhaseForm = this.fb.group({
      countries: this.fb.array([], Validators.required),
    })
  }
    ngOnInit(): void {
        if(this.firstApplForm.get('application_type') !== null){
          this.firstApplForm.controls.application_type.valueChanges.subscribe(() => {
            this.setInternationalMethod()
          })
        }
    }

    onCheckboxChange(e: any, country_id: number) {
        const checkArray: FormArray = this.nationalPhaseForm.get('countries') as FormArray;

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

    getCountriesFormCtrlName(country_id: number){
      const checkArray: FormArray = this.nationalPhaseForm.get('countries') as FormArray;
      let ctrl =checkArray.controls.find(x => x.value == country_id) as FormControl
      if (ctrl == undefined) {
        return new FormControl()
      }
      return ctrl
    }


  onSubmit() {
    if(this.familyForm.valid && this.firstApplForm.valid
      && this.internationalStageForm.valid && this.nationalPhaseForm.valid) {
      this.aggFormData = new FamEstForm('',
        '',0,'',0,0,
        0,0,0,0,0,0,
        false,0,'', false, 0);

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

      // International Stage Form
      this.aggFormData.method = this.internationalStageForm.controls.method.value
      this.aggFormData.meth_country = this.internationalStageForm.controls.meth_country.value
      this.aggFormData.ep_method = this.internationalStageForm.controls.ep_method.value

      // National Phase Form
      this.aggFormData.countries = this.nationalPhaseForm.controls.countries.value

      // Emit
      this.formData.emit(this.aggFormData)
    }
  }


  formReset(){
    this.familyForm.reset();
    this.firstApplForm.reset()
    this.internationalStageForm.reset({method: false, meth_country: '', ep_method: false})
    let frmArray = this.nationalPhaseForm.controls['countries'] as FormArray;
    frmArray.clear()
  }

    setInternationalMethod(){
        let form_value = this.firstApplForm.controls.application_type.value
        let c = this.applTypes.find(x => x.application_type == 'pct')
        if (c != undefined){
            if (form_value == c.id) {
              this.interOption = false
              this.internationalStageForm.reset()
              this.internationalStageForm.controls.method.patchValue(false)
              this.internationalStageForm.controls.meth_country.patchValue('')
              this.internationalStageForm.controls.ep_method.patchValue(false)
            } else {
                this.interOption = true
            }
        }
    }

}
