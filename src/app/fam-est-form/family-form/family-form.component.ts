import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
  selector: 'app-family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.scss']
})
export class FamilyFormComponent implements OnInit, OnDestroy {

  @Output() familyFormComplete = new EventEmitter()

  private destroyed = new Subject<void>()
  public familyForm: FormGroup = this.fb.group({
    family_name: ['', Validators.required],
    family_no: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.familyForm.valueChanges.subscribe(() => {
      this.familyFormComplete.emit(this.familyForm)
    })
  }

  ngOnDestroy(): void {
    this.destroyed.next()
    this.destroyed.complete()
  }
}
