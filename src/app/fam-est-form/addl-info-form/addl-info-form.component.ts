import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {EntitySize} from "../../_models/entitySize.model";
import {Country} from "../../_models/Country.model";
import {filter, find, forEach, some} from "lodash";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-addl-info-form',
  templateUrl: './addl-info-form.component.html',
  styleUrls: ['./addl-info-form.component.scss']
})
export class AddlInfoFormComponent implements OnInit, OnDestroy, OnChanges {

  @Input() entitySizes: EntitySize[] = [new EntitySize()];
  @Input() addlCountries: Country[] = new Array<Country>()
  @Output() addlStage = new EventEmitter;

  trackByIndex = (index: number, country_obj: any) => country_obj.value.country.id;
  private destroyed = new Subject<void>()
  public addEntitySizeForm: FormGroup = this.fb.group({
    infos: this.fb.array([{
      country: [],
      entity_size: [],
    }])
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addEntitySizeForm.valueChanges
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
      this.addlStage.emit(this.addEntitySizeForm)
    })
  }

  ngOnChanges(): void {
    this.createInfoArrayControls()
  }

  ngOnDestroy(): void {
    this.destroyed.next()
    this.destroyed.complete()
  }

  get entitySizeFormArray(): FormArray {
    return this.addEntitySizeForm.get('infos') as FormArray
  }

  filterAllEntitySizes(country: Country) {
    return filter(this.entitySizes, x => {
      return x.country == country.id
    })
  }

  createInfoArrayControls() {
    const checkArray: FormArray = this.entitySizeFormArray
    let removeArr: number[] = []
    forEach(checkArray.controls, (control, key) => {
      if (control) {
        if (!some(this.addlCountries, country => {
          return control.value.country.id == country.id
        })) {
          removeArr.push(key)
        }
      }
    })
    forEach(removeArr.sort((a, b) => b - a), x => {
      checkArray.removeAt(x)
    })
    forEach(this.addlCountries, country => {
      if (!some(checkArray.controls, control => {
        return control.value.country.id == country.id
      })) {
        let dflt_entity_size = find(this.entitySizes, entitySize => {
          return entitySize.country == country.id && entitySize.default_bool
        })
        if (!dflt_entity_size){
          dflt_entity_size = filter(this.entitySizes, entitySize => {
            return entitySize.country == country.id
          })[0]
        }
        let new_control = this.fb.group({
          country: country,
          entity_size: dflt_entity_size
        })
        checkArray.push(new_control)
        this.addlStage.emit(this.addEntitySizeForm)
      }
    })
  }
}
