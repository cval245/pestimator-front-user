import {Component, Input} from '@angular/core';
import {FamEstForm } from "../_models/FamEstForm.model";
import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {Country} from "../../characteristics/_models/Country.model";
import {ApplType} from "../../characteristics/_models/applType.model";

@Component({
  selector: 'app-parameter-details',
  templateUrl: './parameter-details.component.html',
  styleUrls: ['./parameter-details.component.scss']
})
export class ParameterDetailsComponent {
  @Input() formData: FamEstForm= new FamEstForm()

  constructor() {
  }

    ngOnChanges(){
      console.log('sss', this.formData)
    }


}
