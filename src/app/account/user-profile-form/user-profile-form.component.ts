import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserProfile} from '../../_models/userProfile.model';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent {
  @Input() userProfile: UserProfile;
  @Output() formData = new EventEmitter()
  public acctForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userProfile = new UserProfile()
    this.acctForm = this.fb.group({
      id: [undefined],
      company_name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip_code: ['', Validators.required],
      estimates_remaining: ['']
    })
  }

  ngOnChanges() {
    this.acctForm.setValue(this.userProfile)
  }

  onSubmit(): void {
    if (this.acctForm.valid) {
      this.formData.emit(this.acctForm.value)
    }
  }
}
