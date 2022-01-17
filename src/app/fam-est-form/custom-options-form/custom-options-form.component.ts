import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomApplOption} from "../../_models/CustomApplOptions.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Country} from "../../_models/Country.model";
import {IDocFormat} from "../../_models/DocFormat.model";
import {ApplType} from "../../_models/applType.model";
import {filter, find, some} from "lodash";

@Component({
  selector: 'app-custom-options-form',
  templateUrl: './custom-options-form.component.html',
  styleUrls: ['./custom-options-form.component.scss']
})
export class CustomOptionsFormComponent implements OnInit {

  public custApplOptionsForm: FormGroup;
  public country: Country = new Country();
  public applType: ApplType = new ApplType();
  public filteredDocFormats: IDocFormat[] = new Array<IDocFormat>()
  public docFormats: IDocFormat[] = new Array<IDocFormat>()
  public defaultFormat: IDocFormat = {} as IDocFormat
  customApplOptions: CustomApplOption = new CustomApplOption()

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: {
                customOptions: CustomApplOption,
                country: Country, appl_type: ApplType, doc_formats: IDocFormat[]
              }
  ) {
    this.customApplOptions = data.customOptions
    this.country = data.country
    this.applType = data.appl_type
    this.docFormats = data.doc_formats
    this.filteredDocFormats= filter(this.docFormats, x => {
      return some(this.country.available_doc_formats,y => {
        return y.doc_format == x.id && y.appl_type == this.applType.id
      })
    })
    let defaultFormat_id = find(this.country.available_doc_formats, x => {
      return x.default && x.appl_type == this.applType.id
    })!.doc_format
    this.defaultFormat = find(this.docFormats, x => x.id == defaultFormat_id)!
    this.custApplOptionsForm = this.fb.group({
      request_examination_early_bool: [false, Validators.required],
      doc_format: [this.defaultFormat, Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.customApplOptions !== undefined){
      let actual_doc_format: IDocFormat
      if (this.customApplOptions.doc_format === null || undefined){
        actual_doc_format = this.defaultFormat
      } else{
        actual_doc_format = this.customApplOptions.doc_format
      }
      this.custApplOptionsForm.setValue({
        'request_examination_early_bool': this.customApplOptions.request_examination_early_bool,
        'doc_format': actual_doc_format
      })
    }
  }

  submit() {
    let submitData =  this.custApplOptionsForm.value
    this.dialogRef.close({data: submitData})
  }

  cancel() {
    this.dialogRef.close()
  }
}
