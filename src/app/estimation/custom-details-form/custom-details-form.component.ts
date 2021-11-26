import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {CustomApplDetails} from "../_models/CustomApplDetails.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomApplOptions} from "../_models/CustomApplOptions.model";


@Component({
  selector: 'app-custom-details-form',
  templateUrl: './custom-details-form.component.html',
  styleUrls: ['./custom-details-form.component.scss']
})
export class CustomDetailsFormComponent implements OnInit {
  public custDetailsForm: FormGroup;
  public custApplOptionsForm: FormGroup;
  entitySizes: EntitySize[] = [new EntitySize()];
  customApplDetails: CustomApplDetails = new CustomApplDetails()
  customApplOptions: CustomApplOptions = new CustomApplOptions()

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: {customDetails: CustomApplDetails, entitySizes:EntitySize[], customOptions: CustomApplOptions}
  ) {
    this.customApplDetails = data.customDetails
    this.customApplOptions= data.customOptions
    this.entitySizes = data.entitySizes
    this.custDetailsForm = this.fb.group({
      num_indep_claims: [null, Validators.pattern('[0-9]+$')],
      num_claims_multiple_dependent: [null, Validators.pattern('[0-9]+$')],
      num_claims:[null, Validators.pattern('[0-9]+$')],
      num_drawings:[null, Validators.pattern('[0-9]+$')],
      num_pages_description:[null, Validators.pattern('[0-9]+$')],
      num_pages_claims:[null, Validators.pattern('[0-9]+$')],
      num_pages_drawings:[null, Validators.pattern('[0-9]+$')],
      entity_size:[null],
      language:[null],
    })
    this.custApplOptionsForm = this.fb.group({
      request_examination_early_bool: [false, Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.customApplDetails !== undefined){
      this.custDetailsForm.setValue({
        'num_indep_claims': this.customApplDetails.num_indep_claims || null,
        'num_claims': this.customApplDetails.num_claims || null,
        'num_claims_multiple_dependent': this.customApplDetails.num_claims_multiple_dependent || null,
        'num_drawings': this.customApplDetails.num_drawings || null,
        'num_pages_description': this.customApplDetails.num_pages_description || null,
        'num_pages_claims': this.customApplDetails.num_pages_claims || null,
        'num_pages_drawings': this.customApplDetails.num_pages_drawings || null,
        'entity_size':this.customApplDetails.entity_size || null,
        'language': this.customApplDetails.language || null,
      })
    }
    if (this.customApplOptions !== undefined){
      this.custApplOptionsForm.setValue({
        'request_examination_early_bool': this.customApplOptions.request_examination_early_bool,
      })
    }

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
