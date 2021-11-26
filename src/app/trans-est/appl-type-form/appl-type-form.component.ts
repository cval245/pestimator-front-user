import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ApplType} from "../../characteristics/_models/applType.model";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CountryAll} from "../../characteristics/_models/CountryAll.model";
import {Language} from "../../characteristics/_models/Language.model";
import {IEPValidationTranslationRequired} from "../../characteristics/_models/IEPValidationTranslationRequired.model";
import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {IDocFormat} from "../../characteristics/_models/DocFormat.model";


@Component({
  selector: 'app-appl-type-form',
  templateUrl: './appl-type-form.component.html',
  styleUrls: ['./appl-type-form.component.scss']
})
export class ApplTypeFormComponent implements OnInit, OnChanges {

  @Input() country = new CountryAll()
  @Input() applTypes = [new ApplType()]
  @Input() countries = [new CountryAll()]
  @Input() languages = new Array<Language>()
  @Input() entitySizes = [new EntitySize()]
  @Input() docFormats = new Array<IDocFormat>()
  @Input() epValidationTranslate = new Array<IEPValidationTranslationRequired>()
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
      pct_ro_bool: [false],
      pct_accept_bool: [false],
      color: [''],
      long_name: [''],
      available_appl_types: this.fb.array([false]),
      isa_countries: this.fb.array([false]),
      languages_set: this.fb.array([false]),
      available_entity_sizes: this.fb.array([false]),
      ep_validation_translation_required: [0],
      available_doc_formats: this.fb.array([false]),
    })
  }

  ngOnInit(): void {
    this.form.disable()
  }

  ngOnChanges(): void {
    this.initForm()
    console.log('eee', this.entitySizes)
  }

  initForm() {
    this.form.patchValue({
      id: this.country.id,
      country: this.country.country,
      currency_name: this.country.currency_name,
      active_bool: this.country.active_bool,
      ep_bool: this.country.ep_bool,
      pct_ro_bool: this.country.pct_ro_bool,
      pct_accept_bool: this.country.pct_accept_bool,
      color: this.country.color,
      long_name: this.country.long_name,
      ep_validation_translation_required: this.country.ep_validation_translation_required,
      available_entity_sizes: this.country.available_entity_sizes,
      available_doc_formats: this.country.available_doc_formats,
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
      if (country_id > 0) {
        isaCheckArray.push(new FormControl(country_id));
      }
    }
    const langCheckArray: FormArray = this.form.get('languages_set') as FormArray;
    langCheckArray.reset()
    for (let lang of this.country.languages_set) {
      if (lang > 0) {
        langCheckArray.push(new FormControl(lang));
      }
    }
    const entCheckArray: FormArray = this.form.get('available_entity_sizes') as FormArray;
    entCheckArray.reset()
    for (let ent of this.country.available_entity_sizes) {
      if (ent > 0) {
        entCheckArray.push(new FormControl(ent));
      }
    }
    const docFormatCheckArray: FormArray = this.form.get('available_doc_formats') as FormArray;
    docFormatCheckArray.reset()
    for (let doc of this.country.available_doc_formats) {
      if (doc > 0) {
        docFormatCheckArray.push(new FormControl(doc));
      }
    }
  }


  onSubmit() {
    let formValues = this.form.value
    // formValues.available_appl_types =
    formValues.available_appl_types = formValues.available_appl_types.filter((item: number) => {
      return item != null
    })
    formValues.isa_countries = formValues.isa_countries.filter((item: number) => {
      return item != null
    })
    formValues.languages_set = formValues.languages_set.filter((item: number) => {
      return item != null
    })
    formValues.available_entity_sizes = formValues.available_entity_sizes.filter((item: number) => {
      return item != null
    })
    formValues.available_doc_formats = formValues.available_doc_formats.filter((item: number) => {
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

  onLangCheckboxChange(e: any, applType_id: number) {
    const checkArray: FormArray = this.form.get('languages_set') as FormArray;

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
  onEntCheckboxChange(e: any, ent_id: number) {
    const checkArray: FormArray = this.form.get('available_entity_sizes') as FormArray;

    if (e.checked) {
      checkArray.push(new FormControl(ent_id));
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

  onDocFormatCheckboxChange(e: any, doc_id: number) {
    const checkArray: FormArray = this.form.get('available_doc_formats') as FormArray;

    if (e.checked) {
      checkArray.push(new FormControl(doc_id));
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

  getLangFormCtrlName(lang_id: number) {
    const checkArray: FormArray = this.form.get('languages_set') as FormArray;
    let ctrl = checkArray.controls.find(x => x.value == lang_id) as FormControl
    if (ctrl == undefined) {
      return new FormControl()
    }
    return ctrl
  }

  getEntFormCtrlName(ent_id: number) {
    const checkArray: FormArray = this.form.get('available_entity_sizes') as FormArray;
    let ctrl = checkArray.controls.find(x => x.value == ent_id) as FormControl
    if (ctrl == undefined) {
      return new FormControl()
    }
    return ctrl
  }

  getDocFormatFormCtrlName(doc_id: number) {
    const checkArray: FormArray = this.form.get('available_doc_formats') as FormArray;
    let ctrl = checkArray.controls.find(x => x.value == doc_id) as FormControl
    if (ctrl == undefined) {
      return new FormControl()
    }
    return ctrl
  }

  toggleForm() {
    this.formActive = !this.formActive
    // const checkArray: FormArray = this.form.get('available_appl_types') as FormArray;
    if (this.formActive) {
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
