import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Country} from "../../_models/Country.model";
import {LawFirm} from "../../_models/law-firm.model";

@Component({
  selector: 'app-law-firm-form',
  templateUrl: './law-firm-form.component.html',
  styleUrls: ['./law-firm-form.component.scss']
})
export class LawFirmFormComponent implements OnChanges{
  @Input() countries: Country[] = new Array<Country>()
  @Input() lawFirm: LawFirm = new LawFirm()
  @Output() submitLawFirm = new EventEmitter()
  public lawFirmForm: FormGroup = this.fb.group({
      id: [0],
      name: [''],
      long_description: [''],
      website: [''],
      email: [''],
      phone: [''],
      country: [new Country()],
      image_location: ['']
    }
  )

  compareCountry(c_one: Country, c_two: Country) {
    return c_one.id === c_two.id;
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(): void {
    this.lawFirmForm.setValue({
      id: this.lawFirm.id,
      name: this.lawFirm.name,
      long_description: this.lawFirm.long_description,
      website: this.lawFirm.website,
      email: this.lawFirm.email,
      phone: this.lawFirm.phone,
      country: this.lawFirm.country,
      image_location: this.lawFirm.image_location
    })
  }

  onSubmit() {
    this.submitLawFirm.emit(this.lawFirmForm.value)
  }

  cancelForm() {
    this.lawFirmForm.reset()
  }
}
