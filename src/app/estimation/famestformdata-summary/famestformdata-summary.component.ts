import {Component, Input} from '@angular/core';
import {FamEstForm} from "../../_models/FamEstForm.model";

@Component({
  selector: 'app-famestformdata-summary',
  templateUrl: './famestformdata-summary.component.html',
  styleUrls: ['./famestformdata-summary.component.scss']
})
export class FamestformdataSummaryComponent {
  @Input() formData: FamEstForm = new FamEstForm()

  constructor() {
  }

}
