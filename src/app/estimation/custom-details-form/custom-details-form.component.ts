import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {CustomApplDetails} from "../_models/CustomApplDetails.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomApplOptions} from "../_models/CustomApplOptions.model";
import {filter, some} from "lodash";
import {IDocFormat} from "../../characteristics/_models/DocFormat.model";
import {ApplType} from "../../characteristics/_models/applType.model";
import {Country} from "../../characteristics/_models/Country.model";
import {Language} from "../../characteristics/_models/Language.model";


@Component({
  selector: 'app-custom-details-form',
  templateUrl: './custom-details-form.component.html',
  styleUrls: ['./custom-details-form.component.scss']
})
export class CustomDetailsFormComponent implements OnInit {
  public custDetailsForm: FormGroup;
  public custApplOptionsForm: FormGroup;
  public country: Country = new Country();
  public applType: ApplType = new ApplType();
  public filteredDocFormats: IDocFormat[] = new Array<IDocFormat>()
  public docFormats: IDocFormat[] = new Array<IDocFormat>()
  public languages: Language[] = new Array<Language>()
  public filteredLanguages: Language[] = new Array<Language>()
  public defaultFormat: IDocFormat = {} as IDocFormat
  public defaultLanguage: Language = {} as Language
  entitySizes: EntitySize[] = [new EntitySize()];
  customApplDetails: CustomApplDetails = new CustomApplDetails()
  customApplOptions: CustomApplOptions = new CustomApplOptions()

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: {
                customDetails: CustomApplDetails,
                entitySizes: EntitySize[], customOptions: CustomApplOptions,
                country: Country, appl_type: ApplType, doc_formats: IDocFormat[],
                languages: Language[],
              }
  ) {
    this.customApplDetails = data.customDetails
    this.customApplOptions = data.customOptions
    this.entitySizes = data.entitySizes
    this.docFormats = data.doc_formats
    this.languages = data.languages
    this.country = data.country
    this.applType = data.appl_type
    console.log('this.c', data)
    this.filteredDocFormats = filter(this.docFormats, x => {
      return some(this.country.available_doc_formats, y => {
        return (y.doc_format == x.id && y.appl_type == this.applType.id)
      })
    })
    this.filteredLanguages = filter(this.languages, x => {
      return some(this.country.available_languages, y => {
        return (y.language == x.id && y.appl_type == this.applType.id)
      })
    })
    let default_format_id = this.country.available_doc_formats.find(x => {
      return x.default && x.appl_type == this.applType.id
    })!.doc_format
    this.defaultFormat = this.docFormats.find(x => {
      return x.id == default_format_id
    })!
    let defaultLanguage_id = this.country.available_languages.find(x => {
      return x.default && x.appl_type == this.applType.id
    })!.language
    this.defaultLanguage = this.languages.find(x => {
      return x.id == defaultLanguage_id
    })!
    this.custDetailsForm = this.fb.group({
      num_indep_claims: [null, Validators.pattern('[0-9]+$')],
      num_claims_multiple_dependent: [null, Validators.pattern('[0-9]+$')],
      num_claims: [null, Validators.pattern('[0-9]+$')],
      num_drawings: [null, Validators.pattern('[0-9]+$')],
      num_pages_description: [null, Validators.pattern('[0-9]+$')],
      num_pages_claims: [null, Validators.pattern('[0-9]+$')],
      num_pages_drawings: [null, Validators.pattern('[0-9]+$')],
      entity_size: [null],
      language: [this.defaultLanguage],
    })
    this.custApplOptionsForm = this.fb.group({
      request_examination_early_bool: [false, Validators.required],
      doc_format: [this.defaultFormat, Validators.required],
    })
    console.log('tttt', this.customApplOptions.doc_format)
    console.log('eee', this.defaultFormat)
    if (this.customApplDetails !== undefined) {
      this.custDetailsForm.setValue({
        'num_indep_claims': this.customApplDetails.num_indep_claims || null,
        'num_claims': this.customApplDetails.num_claims || null,
        'num_claims_multiple_dependent': this.customApplDetails.num_claims_multiple_dependent || null,
        'num_drawings': this.customApplDetails.num_drawings || null,
        'num_pages_description': this.customApplDetails.num_pages_description || null,
        'num_pages_claims': this.customApplDetails.num_pages_claims || null,
        'num_pages_drawings': this.customApplDetails.num_pages_drawings || null,
        'entity_size': this.customApplDetails.entity_size || null,
        'language': this.customApplDetails.language ? this.customApplDetails.language : this.defaultLanguage,
      })
    }
    if (this.customApplOptions !== undefined) {
      this.custApplOptionsForm.setValue({
        'request_examination_early_bool': this.customApplOptions.request_examination_early_bool,
        'doc_format': this.customApplOptions.doc_format ? this.customApplOptions.doc_format : this.defaultFormat,
      })
    }
  }

  ngOnInit(): void {


  }


  submit() {
    let submitData = {'custom_appl_details': this.custDetailsForm.value,
      'custom_appl_options': this.custApplOptionsForm.value}
    this.dialogRef.close({data: submitData})
  }

  cancel() {
    this.dialogRef.close()
  }
}
