import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EntitySize} from "../../_models/entitySize.model";
import {CustomApplDetails} from "../../_models/CustomApplDetails.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomApplOption} from "../../_models/CustomApplOptions.model";
import {filter, find, isEqual, some} from "lodash";
import {IDocFormat} from "../../_models/DocFormat.model";
import {ApplType} from "../../_models/applType.model";
import {Country} from "../../_models/Country.model";
import {Language} from "../../_models/Language.model";


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
  customApplOptions: CustomApplOption = new CustomApplOption()

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: {
                customDetails: CustomApplDetails,
                entitySizes: EntitySize[], customOptions: CustomApplOption,
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
    let language = find(this.filteredLanguages, z => {
      return isEqual(z, this.customApplDetails.language)
    })
    let docFormat = find(this.filteredDocFormats, z => {
      return isEqual(z, this.customApplOptions.doc_format)
    })

    this.custDetailsForm = this.fb.group({
      num_indep_claims: [null, Validators.pattern('[0-9]+$')],
      num_claims_multiple_dependent: [null, Validators.pattern('[0-9]+$')],
      num_claims: [null, Validators.pattern('[0-9]+$')],
      num_drawings: [null, Validators.pattern('[0-9]+$')],
      num_pages_description: [null, Validators.pattern('[0-9]+$')],
      num_pages_claims: [null, Validators.pattern('[0-9]+$')],
      num_pages_drawings: [null, Validators.pattern('[0-9]+$')],
      entity_size: [null],
      language: [{} as Language],
    })
    this.custApplOptionsForm = this.fb.group({
      request_examination_early_bool: [false, Validators.required],
      doc_format: [this.defaultFormat, Validators.required],
    })
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
        'language': language
      })
    }
    if (this.customApplOptions !== undefined) {
      this.custApplOptionsForm.setValue({
        'request_examination_early_bool': this.customApplOptions.request_examination_early_bool,
        'doc_format': docFormat
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
