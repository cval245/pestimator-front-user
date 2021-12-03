import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomApplOptions} from "../_models/CustomApplOptions.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Country} from "../../characteristics/_models/Country.model";
import {IDocFormat} from "../../characteristics/_models/DocFormat.model";
import {ApplType} from "../../characteristics/_models/applType.model";
import {map} from "lodash";

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
  customApplOptions: CustomApplOptions = new CustomApplOptions()

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: {
                customOptions: CustomApplOptions,
                country: Country, appl_type: ApplType, doc_formats: IDocFormat[]
              }
  ) {
    this.customApplOptions = data.customOptions
    this.country = data.country
    this.applType = data.appl_type
    this.docFormats = data.doc_formats
    this.filteredDocFormats = map(this.country.available_doc_formats, x => {
      return this.docFormats.find(y => y.id == x.doc_format)!
    })
    let default_format = this.country.available_doc_formats.find(x => {
      return x.default && x.appl_type == this.applType.id
    })
    this.custApplOptionsForm = this.fb.group({
      request_examination_early_bool: [false, Validators.required],
      doc_format: [default_format, Validators.required]
    })
  }
  ngOnInit(): void {
    if (this.customApplOptions !== undefined){
      this.custApplOptionsForm.setValue({
        'request_examination_early_bool': this.customApplOptions.request_examination_early_bool,
        'doc_format': this.customApplOptions.doc_format ? this.customApplOptions.doc_format : this.defaultFormat,
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
