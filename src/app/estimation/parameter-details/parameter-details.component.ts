import {Component, Input} from '@angular/core';
import {FamEstFormFull} from "../_models/FamEstForm.model";
import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {Country} from "../../characteristics/_models/Country.model";
import {ApplType} from "../../characteristics/_models/applType.model";

@Component({
  selector: 'app-parameter-details',
  templateUrl: './parameter-details.component.html',
  styleUrls: ['./parameter-details.component.scss']
})
export class ParameterDetailsComponent {
  @Input() formData: FamEstFormFull = new FamEstFormFull(
    '',
    '',
    new EntitySize(0, '', ''),
    new Date(),
    new Country(0, '', '', false, false, false, '', '', [0], [0], [0]),
    new ApplType(0, '', '', [0]),
    0,
    0,
    0,
    0, 0, 0,
    false,
    new Country(0, '', '', false, false, false, '', '', [0], [0], [0]),
    new Country(0, '', '', false, false, false, '', '', [0], [0], [0]),
    [],
    false, 0, 0, 0, 0
  )

  constructor() {
  }


}
