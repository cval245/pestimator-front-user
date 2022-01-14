import {Component, Input, OnInit} from '@angular/core';
import {CustomApplDetails} from "../../_models/CustomApplDetails.model";

@Component({
  selector: 'app-custom-appl-details',
  templateUrl: './custom-appl-details.component.html',
  styleUrls: ['./custom-appl-details.component.scss']
})
export class CustomApplDetailsComponent implements OnInit {

  @Input() customApplDetails: CustomApplDetails = new CustomApplDetails()

  constructor() { }

  ngOnInit(): void {
  }


}
