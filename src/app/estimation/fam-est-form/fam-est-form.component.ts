import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() applTypes: ApplType[];
  @Input() countries: Country[];
  @Input() pct_countries: Country[];
  @Input() entitySizes: EntitySize[];
  @Output() formData = new EventEmitter;
  public aggFormData: FamEstForm;
  public method: Boolean;
  public ep_method: Boolean;
  public interOption: Boolean = true;
  public isEditable;
  public famEstForm: FormGroup;
  public familyForm: FormGroup;
  public firstApplForm: FormGroup;
  public internationalStageForm: FormGroup;
  public nationalPhaseForm: FormGroup;

  constructor(private fb: FormBuilder,
  ) {
    this.method = false;
    this.ep_method = false;
    this.isEditable = true;
    this.aggFormData = new FamEstForm()
    this.applTypes = [new ApplType];
    this.countries = [new Country(0, '', '', false, false, '', '')];
    this.pct_countries = [new Country(0, '', '', false, false, '', '')];
    this.entitySizes = [new EntitySize];

    this.familyForm = this.fb.group({
      family_name: ['', Validators.required],
      family_no: ['', Validators.required],
      entity_size: ['', Validators.required]
    })
    this.firstApplForm = this.fb.group({
      country: ['', Validators.required],
      application_type: ['', Validators.required],
      date_filing: ['', Validators.required],
      num_claims: ['', Validators.required],
      num_indep_claims: ['', Validators.required],
      num_drawings: ['', Validators.required],
      num_pages: ['', Validators.required],
    })
    this.internationalStageForm = this.fb.group({
      method: [false],
      meth_country: [''],
      ep_method: [false],
    })
    this.nationalPhaseForm = this.fb.group({
      countries: this.fb.array([]),
    })
    this.famEstForm = this.fb.group({
      family_name: ['', Validators.required],
      family_no: ['', Validators.required],
      countries: this.fb.array([]),
      first_application: this.fb.group({
        country: ['', Validators.required],
        application_type: ['', Validators.required],
                date_filing: [new Date(), Validators.required],
                application_details: this.fb.group({
                    num_claims: ['', Validators.required],
                    num_drawings: ['', Validators.required],
                    num_pages: ['', Validators.required],
                })
            }),
            international_method: this.fb.group({
              method: [false],
              meth_country: [''],
              ep_method: [false],
            }),
            entity_size: ['', Validators.required]
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
            if (item.value == country_id) {
              checkArray.removeAt(i);
              return;
            }
            i++;
          });
        }
    }

  pctMethod(e: any) {
    this.method = e.checked
  }

  epMethod(e: any) {
    this.ep_method = e.checked
  }

  onSubmit() {
    this.aggFormData = new FamEstForm()
    // Family Details
    this.aggFormData.family_name = this.familyForm.controls.family_name.value
    this.aggFormData.family_no = this.familyForm.controls.family_no.value
    this.aggFormData.entity_size = this.familyForm.controls.entity_size.value

    // Initial Application
    this.aggFormData.init_appl_filing_date = this.firstApplForm.controls.date_filing.value
    this.aggFormData.init_appl_country = this.firstApplForm.controls.country.value
    this.aggFormData.init_appl_type = this.firstApplForm.controls.application_type.value
    this.aggFormData.init_appl_drawings = this.firstApplForm.controls.num_drawings.value
    this.aggFormData.init_appl_pages = this.firstApplForm.controls.num_pages.value
    this.aggFormData.init_appl_claims = this.firstApplForm.controls.num_claims.value
    this.aggFormData.init_appl_indep_claims = this.firstApplForm.controls.num_indep_claims.value

    // International Stage Form
    console.log('ggg', this.internationalStageForm.value)
    this.aggFormData.method = this.internationalStageForm.controls.method.value
    this.aggFormData.meth_country = this.internationalStageForm.controls.meth_country.value
    this.aggFormData.ep_method = this.internationalStageForm.controls.ep_method.value

    // National Phase Form
    this.aggFormData.countries = this.nationalPhaseForm.controls.countries.value

    // Emit
    console.log('this.aggFormData', this.aggFormData)
    this.formData.emit(this.aggFormData)
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
