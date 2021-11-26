import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FamEstForm} from "../_models/FamEstForm.model";

@Component({
  selector: 'app-fam-est-confirm',
  templateUrl: './fam-est-confirm.component.html',
  styleUrls: ['./fam-est-confirm.component.scss']
})
export class FamEstConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public formData: FamEstForm) { }


  save(){
    this.dialogRef.close({event:'save'})
  }

  cancel(){
    this.dialogRef.close({event:'cancel'})
  }
}
