import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CustomApplDetails} from "../../_models/CustomApplDetails.model";
import {Country} from "../../_models/Country.model";
import {ApplType} from "../../_models/applType.model";

@Component({
  selector: 'app-custom-appl-details',
  templateUrl: './custom-appl-details.component.html',
  styleUrls: ['./custom-appl-details.component.scss']
})
export class CustomApplDetailsComponent implements OnInit, OnChanges {

  @Input() customApplDetails: CustomApplDetails = new CustomApplDetails()
  @Input() country: Country = new Country()
  @Input() appl_type: ApplType = new ApplType()
  public language_format_display: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.country && this.customApplDetails) {
      if (this.country.available_doc_formats) {
        let default_value = this.country.available_languages.find(x => {
          return x.default && (x.appl_type == this.appl_type.id)
        })
        if (default_value && this.customApplDetails.language) {
          if (this.customApplDetails.language.id != default_value.language) {
            this.language_format_display = true
          } else {
            this.language_format_display = false
          }
        } else {
          this.language_format_display = false
        }
      }
    }
  }
}
