import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ApplType} from "../../_models/applType.model";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CountryAll} from "../../_models/CountryAll.model";
import {Language} from "../../_models/Language.model";
import {IEPValidationTranslationRequired} from "../../_models/IEPValidationTranslationRequired.model";
import {EntitySize} from "../../_models/entitySize.model";
import {IDocFormat} from "../../_models/DocFormat.model";
import {cloneDeep, filter, flatMap, map} from "lodash";
import {ITranslationRequiredOptions} from "../../_models/ITranslationRequiredOptions";


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
  @Input() transReqOptions: ITranslationRequiredOptions[] = new Array<ITranslationRequiredOptions>();
  public filteredApplTypes = [new ApplType()]
  public form: FormGroup;
  public formActive: boolean = false;
  public filteredEntitySizes: EntitySize[] = [new EntitySize()];

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
      available_appl_types: this.fb.array([]),
      isa_countries: this.fb.array([false]),
      available_languages: this.fb.array([]),
      // available_entity_sizes: this.fb.array([false]),
      ep_validation_translation_required: [0],
      utility_translation_required: [0],
      available_doc_formats: this.fb.array([false]),
    })
    this.getApplTypeArray.valueChanges.subscribe((x: number[]) => {
      this.filteredApplTypes = cloneDeep([])
      this.filteredApplTypes = map(x, z => this.applTypes.find(y => {
        return y.id == z
      })!)
    })
  }

  ngOnInit(): void {
    this.form.disable()
  }

  ngOnChanges(): void {
    this.initForm()
    if (this.country.id != 0) {
      this.filteredEntitySizes = filter(this.entitySizes, x => {
        return x.country == this.country.id
      })
    }
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
      utility_translation_required: this.country.utility_translation_required,
      // available_entity_sizes: this.country.available_entity_sizes,
      available_doc_formats: this.country.available_doc_formats,
      available_languages: this.country.available_languages,
      // available_doc_formats: this.country? this.country.available_doc_formats: [],
    })
    const checkArray: FormArray = this.form.get('available_appl_types') as FormArray;
    checkArray.clear()
    for (let applType_id of this.country.available_appl_types) {
      if (applType_id > 0) {
        checkArray.push(new FormControl(applType_id));
      }
    }
    const isaCheckArray: FormArray = this.form.get('isa_countries') as FormArray;
    isaCheckArray.clear()
    for (let country_id of this.country.isa_countries) {
      if (country_id > 0) {
        isaCheckArray.push(new FormControl(country_id));
      }
    }
    const langCheckArray: FormArray = this.form.get('available_languages') as FormArray;
    langCheckArray.clear()
    for (let a of this.filteredApplTypes) {
      // create formgroup
      let aLangForm = this.fb.group({
        country: [this.country.id],
        appl_type: [a],
        languages: this.fb.array([])
      })
      // create formarray for each of the languages with selected column
      const langsOnlyCheckArray: FormArray = aLangForm.get('languages') as FormArray
      for (let lang of this.languages) {
        let lang_used = this.country.available_languages.find(x => x.language == lang.id
          && x.appl_type == a.id)

        if (lang_used) {
          langsOnlyCheckArray.push(this.fb.group({
            language: [lang],
            selected: [true],
            default: [lang_used.default],
          }))
        } else {
          langsOnlyCheckArray.push(this.fb.group({
            language: [lang],
            selected: [false],
            default: [false],
          }))
        }
      }
      langCheckArray.push(aLangForm)
    }

    const docFormatCheckArray: FormArray = this.form.get('available_doc_formats') as FormArray;
    docFormatCheckArray.clear()
    for (let aType of this.applTypes) {
      for (let doc of this.docFormats) {
        let doc_used = this.country.available_doc_formats.find(x => x.doc_format == doc.id
          && x.appl_type == aType.id)
        if (doc_used) {
          docFormatCheckArray.push(this.fb.group({
            doc: [{
              country: this.country.id,
              appl_type: aType,
              doc_format: doc,
            }],
            default: [doc_used.default],
            selected: [true],
          }));
        } else {
          docFormatCheckArray.push(this.fb.group({
            doc: [{
              country: this.country.id,
              appl_type: aType,
              doc_format: doc,
            }],
            default: [false],
            selected: [false],
          }));
        }
      }
    }
  }

  get getALangCtrlArray() {
    return this.form.get('available_languages') as FormArray;
  }

  returnLangsCtrlArray(fg: FormGroup) {
    return fg.get('languages') as FormArray;
  }

  get getDocFormatCtrlArray() {
    return this.form.get('available_doc_formats') as FormArray;
  }

  asFormGroup(a: AbstractControl) {
    return a as FormGroup
  }

  get getApplTypeArray() {
    return this.form.get('available_appl_types') as FormArray;
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
    // let langs = formValues.available_languages.filter(x => {
    //   return x.languages.selected == True
    // })
    formValues.available_languages = flatMap(formValues.available_languages, (x: any) => {
      let selected_langs = filter(x.languages, (z: any) => z.selected)
      return map(selected_langs, (y: any) => {
        return {language: y.language.id, appl_type: x.appl_type.id, default: y.default, country: x.country}
      })
      // return {default: x.languages.default, appl_type: x.appl_type.id, language: x.languages.language.id, country: x.country.id}
    })
    // formValues.available_entity_sizes = formValues.available_entity_sizes.filter((item: number) => {
    //   return item != null
    // })
    let docFormats = formValues.available_doc_formats.filter((item: any) => {
      return item.selected == true
    })
    formValues.available_doc_formats = docFormats.map((x: any) => {
      return {
        default: x.default,
        doc_format: x.doc.doc_format.id,
        appl_type: x.doc.appl_type.id,
        country: x.doc.country.id
      }
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
    if (this.formActive) {
      this.initForm()
      this.form.enable()
    } else {
      this.initForm()
      this.form.disable()
    }
  }
}
