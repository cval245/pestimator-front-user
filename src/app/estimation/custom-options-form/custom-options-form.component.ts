import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomApplOptions} from "../_models/CustomApplOptions.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-custom-options-form',
  templateUrl: './custom-options-form.component.html',
  styleUrls: ['./custom-options-form.component.scss']
})
export class CustomOptionsFormComponent implements OnInit {

  public custApplOptionsForm: FormGroup;
  customApplOptions: CustomApplOptions = new CustomApplOptions()

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: CustomApplOptions
  ) {
    this.customApplOptions= data
    this.custApplOptionsForm = this.fb.group({
      request_examination_early_bool: [false, Validators.required]
    })
  }
  ngOnInit(): void {
    if (this.customApplOptions !== undefined){
      this.custApplOptionsForm.setValue({
        'request_examination_early_bool': this.customApplOptions.request_examination_early_bool,
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
