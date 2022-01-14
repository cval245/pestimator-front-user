import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CustomApplOption} from "../../_models/CustomApplOptions.model";
import {Country} from "../../_models/Country.model";
import {ApplType} from "../../_models/applType.model";

@Component({
  selector: 'app-custom-appl-options',
  templateUrl: './custom-appl-options.component.html',
  styleUrls: ['./custom-appl-options.component.scss']
})
export class CustomApplOptionsComponent implements OnInit, OnChanges {
  @Input() customApplOption: CustomApplOption = new CustomApplOption()
  @Input() country: Country = new Country()
  @Input() appl_type: ApplType = new ApplType()
  public doc_format_display: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.country && this.customApplOption) {
      if (this.country.available_doc_formats){
        let default_value = this.country.available_doc_formats.find(x => {
          return x.default && (x.appl_type == this.appl_type.id)
        })
        if (default_value && this.customApplOption.doc_format) {
          if (this.customApplOption.doc_format.id != default_value.doc_format) {
            this.doc_format_display = true
          } else {
            this.doc_format_display = false
          }
        } else {
          this.doc_format_display = false
        }
      }
    }
  }
}
