import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {forEach} from "lodash";
import {Country} from "../../_models/Country.model";
import {APPL_VERSIONS} from "../../estimation/enums";

@Component({
  selector: 'app-single-utility-form',
  templateUrl: './single-utility-form.component.html',
  styleUrls: ['./single-utility-form.component.scss']
})
export class SingleUtilityFormComponent implements OnInit {

  public utilityChecker: boolean = false;
  public singleUtilityForm: FormGroup = this.fb.group({
    double_countries: this.fb.array([])
  })
  get doubleUtilityFormArray(): FormArray {
    return this.singleUtilityForm.controls.double_countries as FormArray
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  submitUtilityCorrections() {
    forEach(this.doubleUtilityFormArray.controls, y => {
      this.fixUtilityCorrections(y.value.country.country, y.value.appl_version)
    })
    this.utilityChecker = false
  }


  fixUtilityCorrections(country: Country, appl_version: APPL_VERSIONS) {
    //TODO
  }
}
