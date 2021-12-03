import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ApplType} from "../../characteristics/_models/applType.model";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CountryAll} from "../../characteristics/_models/CountryAll.model";
import {Language} from "../../characteristics/_models/Language.model";
import {IEPValidationTranslationRequired} from "../../characteristics/_models/IEPValidationTranslationRequired.model";
import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {IDocFormat} from "../../characteristics/_models/DocFormat.model";
import {cloneDeep, filter, flatMap, map} from "lodash";


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
  public filteredApplTypes = [new ApplType()]
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
      available_appl_types: this.fb.array([]),
      isa_countries: this.fb.array([false]),
      available_languages: this.fb.array([]),
      available_entity_sizes: this.fb.array([false]),
      ep_validation_translation_required: [0],
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
    // console.log('eee', this.entitySizes)
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
      available_languages: this.country.available_languages,
      // available_doc_formats: this.country? this.country.available_doc_formats: [],
    })
    // console.log('this.country', this.country)
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
    console.log('sss', this.form.get('available_languages')!.value)
    // langCheckArray.reset()
    // for (let lang of this.country.available_languages) {
    //   if (lang > 0) {
    //     langCheckArray.push(new FormControl(lang));
    //   }
    // }
    const entCheckArray: FormArray = this.form.get('available_entity_sizes') as FormArray;
    entCheckArray.reset()
    for (let ent of this.country.available_entity_sizes) {
      if (ent > 0) {
        entCheckArray.push(new FormControl(ent));
      }
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
    console.log('formValues', formValues.available_languages)
    formValues.available_entity_sizes = formValues.available_entity_sizes.filter((item: number) => {
      return item != null
    })
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

  // onLangCheckboxChange(e: any, applType_id: number) {
  //   const checkArray: FormArray = this.form.get('available_languages') as FormArray;
  //
  //   if (e.checked) {
  //     checkArray.push(new FormControl(applType_id));
  //   } else {
  //     let i: number = 0;
  //     checkArray.controls.forEach((item: AbstractControl) => {
  //       if (item.value == false) {
  //         checkArray.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  // }
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

  // onDocFormatCheckboxChange(e: any, doc_id: number, appl_type_id: number,) {
  //   const checkArray: FormArray = this.form.get('available_doc_formats') as FormArray;
  //
  //   if (e.checked) {
  //     checkArray.push(new FormControl({
  //       country: this.country.id,
  //       appl_type: appl_type_id,
  //       doc_format: doc_id,
  //       default: false}));
  //   } else {
  //     let i: number = 0;
  //     checkArray.controls.forEach((item: AbstractControl) => {
  //       if (item.value == false) {
  //         checkArray.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  // }
  // onDocFormatDefaultCheckboxChange(e: any, doc_id: number, appl_type_id: number,) {
  //   const checkArray: FormArray = this.form.get('available_doc_formats') as FormArray;
  //
  //   if (e.checked) {
  //     let check = checkArray.controls.find(x => x.value.country = this.country.id
  //       && x.value.appl_type == appl_type_id
  //       && x.value.doc_format == doc_id)
  //     if (check){
  //       check.patchValue({default: true})
  //     } else {
  //       e.checked = false
  //     }
  //   } else {
  //     let i: number = 0;
  //     let check = checkArray.controls.find(x => x.value.country = this.country.id
  //       && x.value.appl_type == appl_type_id
  //       && x.value.doc_format == doc_id)
  //     check!.patchValue({default: false})
  //   }
  // }


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

  // getLangFormCtrlName(lang_id: number) {
  //   const checkArray: FormArray = this.form.get('available_languages') as FormArray;
  //   let ctrl = checkArray.controls.find(x => x.value == lang_id) as FormControl
  //   if (ctrl == undefined) {
  //     return new FormControl()
  //   }
  //   return ctrl
  // }

  getEntFormCtrlName(ent_id: number) {
    const checkArray: FormArray = this.form.get('available_entity_sizes') as FormArray;
    let ctrl = checkArray.controls.find(x => x.value == ent_id) as FormControl
    if (ctrl == undefined) {
      return new FormControl()
    }
    return ctrl
  }

  // getDocFormatFormGroup(doc_id: number, appl_type_id: number){
  //   const checkArray: FormArray = this.form.get('available_doc_formats') as FormArray;
  //   console.log('cccc', checkArray)
  //   let ctrl = checkArray.controls.find(x => {
  //     if (x.value !== null) {
  //       return x.value.doc_format == doc_id && x.value.appl_type == appl_type_id
  //     }
  //     return false
  //   })
  //   return new FormGroup({})
  // }


  //  getDocFormatFormCtrlName(doc_id: number, appl_type_id: number,) {
  //   const checkArray: FormArray = this.form.get('available_doc_formats') as FormArray;
  //   // console.log('cccc', checkArray)
  //
  //   if (checkArray.controls.length>0) {
  //     let ctrl = checkArray.controls.find(x => {
  //       // console.log('x', x)
  //       if (x.value !== null){
  //         return x.value.doc_format == doc_id && x.value.appl_type == appl_type_id
  //       }
  //       return false
  //     }) as FormControl
  //     if (ctrl == undefined) {
  //       return new FormControl()
  //     }
  //     return ctrl
  //   }
  //   return new FormControl()
  // }

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
