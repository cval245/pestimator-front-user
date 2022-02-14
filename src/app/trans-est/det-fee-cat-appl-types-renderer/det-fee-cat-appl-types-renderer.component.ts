import {Component, OnInit} from '@angular/core';
import {ICellRendererParams} from "@ag-grid-community/core";
import {forEach, some} from "lodash";
import {ApplType} from "../../_models/applType.model";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {DetailedFeeCategoryService} from "../_services/detailed-fee-category.service";
import {IDetailedFeeCategory} from "../_models/DetailedFeeCategory.model";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-det-fee-cat-appl-types-renderer',
  templateUrl: './det-fee-cat-appl-types-renderer.component.html',
  styleUrls: ['./det-fee-cat-appl-types-renderer.component.scss']
})
export class DetFeeCatApplTypesRendererComponent implements OnInit {
  //@ts-ignore
  // private params: ICellRendererParams;
  public conditions: any
  public adjustConditions: any = []
  public applTypes: ApplType[] = new Array<ApplType>();
  private destroyed = new Subject<void>()
  private detailedFeeCategory: IDetailedFeeCategory = {} as IDetailedFeeCategory;
  public applTypeForm: FormGroup = this.fb.group({
    appl_types: this.fb.array([
      // {appl_type: [],//[new ApplType()],
      //   selected: [false]}
    ])
  })

  constructor(private fb: FormBuilder,
              private detailedFeeCatSer: DetailedFeeCategoryService) {
  }

  ngOnInit(): void {
    this.applTypeForm.valueChanges.pipe(
      takeUntil(this.destroyed))
      .subscribe(y => {
        let filtered_new = y.appl_types.filter((x: any) => x.selected == true)
        this.detailedFeeCategory.country = this.detailedFeeCategory.country.id
        this.detailedFeeCategory.appl_types = filtered_new.map((z: any) => z.appl_type.id)
        if (this.detailedFeeCategory.id == 0 || undefined) {
          this.detailedFeeCatSer.add(this.detailedFeeCategory).subscribe()
        } else {
          this.detailedFeeCatSer.update(this.detailedFeeCategory).subscribe()
        }
        this.detailedFeeCategory = y
      })
  }

  agInit(params: ICellRendererParams): void {
    // @ts-ignore
    this.applTypes = params.values
    this.detailedFeeCategory = params.data

    this.createApplTypeControls()
  }

  get applTypesFormArray(): FormArray {
    return this.applTypeForm.get('appl_types') as FormArray
  }

  ngOnDestroy(): void {
    this.destroyed.next()
    this.destroyed.complete()
  }


  createApplTypeControls() {
    const checkArray: FormArray = this.applTypesFormArray
    forEach(this.applTypes, x => {
      if (!some(checkArray.controls, control => {
        return control.value.appl_type.id == x.id
      })) {
        let new_control
        if (some(this.detailedFeeCategory.appl_types, y => y == x.id)) {
          new_control = this.fb.group({
            selected: true,
            appl_type: x,
          })
        } else {
          new_control = this.fb.group({
            selected: false,
            appl_type: x,
          })
        }
        checkArray.push(new_control)
      }
    })
  }
}
