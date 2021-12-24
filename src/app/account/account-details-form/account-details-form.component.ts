import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserProfile} from '../../_models/userProfile.model';

@Component({
  selector: 'app-account-details-form',
  templateUrl: './account-details-form.component.html',
  styleUrls: ['./account-details-form.component.scss']
})
export class AccountDetailsFormComponent implements OnInit {

    @Input() userProfile: UserProfile;
    @Output() formData = new EventEmitter()
    public acctForm: FormGroup;
    public buttonDisabled = true

    constructor(private fb: FormBuilder) {
        this.userProfile = new UserProfile()
        this.acctForm = this.fb.group({
          id: [0],
          company_name: ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zip_code: ['', Validators.required],
          estimates_remaining: ['']
        })
    }

    ngOnChanges(){
        this.acctForm.setValue(this.userProfile)
    }

    ngOnInit(): void {
        this.disableForm()
    }

    editFormButton(){
        this.enableForm()
    }

    cancelForm(){
      this.acctForm.setValue(this.userProfile)
        this.disableForm()
    }

    enableForm(){
        this.acctForm.controls.company_name.enable()
        this.acctForm.controls.address.enable()
        this.acctForm.controls.city.enable()
        this.acctForm.controls.state.enable()
        this.acctForm.controls.zip_code.enable()
        this.buttonDisabled = false
    }

    disableForm(){
        this.acctForm.controls.company_name.disable()
        this.acctForm.controls.address.disable()
        this.acctForm.controls.city.disable()
        this.acctForm.controls.state.disable()
        this.acctForm.controls.zip_code.disable()
        this.buttonDisabled = true
    }

    onSubmit(): void{
        if (this.acctForm.valid){
            this.formData.emit(this.acctForm.value)
            this.disableForm()
        }
    }
}
