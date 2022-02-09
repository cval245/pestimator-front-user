import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IConditions} from "../_models/Conditions.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EntitySizeService} from 'src/app/_services/entity-size.service';
import {EntitySize} from "../../_models/entitySize.model";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ComplexConditionsService} from "../_services/complex-conditions.service";
import {ComplexTimeConditionsService} from "../../_services/complex-time-conditions.service";
import {IComplexConditions} from "../_models/ComplexConditions.model";
import {IComplexTimeConditions} from "../_models/IComplexTimeConditions";
import {ConditionsService} from "../_services/conditions.service";
import {forIn} from "lodash";
import {DocFormatService} from "../../_services/doc-format.service";
import {IDocFormat} from "../../_models/DocFormat.model";
import {Country} from "../../_models/Country.model";
import {LanguageService} from "../../_services/language.service";
import {Language} from "../../_models/Language.model";

@Component({
  selector: 'app-conditions-form',
  templateUrl: './conditions-form.component.html',
  styleUrls: ['./conditions-form.component.scss']
})
export class ConditionsFormComponent implements OnInit {

  public condForm: FormGroup;
  private destroy = new Subject<void>()
  public entitySizes: EntitySize[] = new Array<EntitySize>();
  public complexConditions: IComplexConditions[] = new Array<IComplexConditions>();
  public complexTimeConditions: IComplexTimeConditions[] = new Array<IComplexTimeConditions>();
  public docFormats: IDocFormat[] = new Array<IDocFormat>();
  public docFormatsAvail: IDocFormat[] = new Array<IDocFormat>();
  public country: Country = new Country()
  public languages: Language[] = new Array<Language>()

  constructor(
    public dialogRef: MatDialogRef<ConditionsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { conditions: IConditions, country: Country },
    private fb: FormBuilder,
    private entitySizeSer: EntitySizeService,
    private docFormatSer: DocFormatService,
    private complexCondSer: ComplexConditionsService,
    private complexTimeCondSer: ComplexTimeConditionsService,
    private languageSer: LanguageService,
    private condSer: ConditionsService,
  ) {
    this.country = data.country
    this.entitySizeSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.destroy)).subscribe((x: EntitySize[]) => {
      this.entitySizes = x
    })
    this.docFormatSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.destroy)).subscribe((x: IDocFormat[]) => {
      this.docFormats = x
    })
    this.languageSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.destroy)).subscribe((x: Language[]) => {
      this.languages = x
    })
    this.complexCondSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.destroy)).subscribe((x: IComplexConditions[]) => {
      this.complexConditions = x
    })
    this.complexTimeCondSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.destroy)).subscribe((x: IComplexConditions[]) => {
      this.complexTimeConditions = x
    })
    this.condForm = this.fb.group({
      id: [data.conditions.id],
      condition_claims_min: [data.conditions.condition_claims_min],
      condition_claims_max: [data.conditions.condition_claims_max],
      condition_indep_claims_min: [data.conditions.condition_indep_claims_min],
      condition_indep_claims_max: [data.conditions.condition_indep_claims_max],
      condition_claims_multiple_dependent_min: [data.conditions.condition_claims_multiple_dependent_min],
      condition_claims_multiple_dependent_max: [data.conditions.condition_claims_multiple_dependent_max],

      condition_pages_total_min: [data.conditions.condition_pages_total_min],
      condition_pages_total_max: [data.conditions.condition_pages_total_max],
      condition_pages_desc_min: [data.conditions.condition_pages_desc_min],
      condition_pages_desc_max: [data.conditions.condition_pages_desc_max],
      condition_pages_claims_min: [data.conditions.condition_pages_claims_min],
      condition_pages_claims_max: [data.conditions.condition_pages_claims_max],
      condition_pages_drawings_min: [data.conditions.condition_pages_drawings_min],
      condition_pages_drawings_max: [data.conditions.condition_pages_drawings_max],
      condition_drawings_min: [data.conditions.condition_drawings_min],
      condition_drawings_max: [data.conditions.condition_drawings_max],
      condition_entity_size: [data.conditions.condition_entity_size],
      condition_complex: [data.conditions.condition_complex],
      condition_time_complex: [data.conditions.condition_time_complex],
      condition_annual_prosecution_fee: [data.conditions.condition_annual_prosecution_fee],
      condition_annual_prosecution_fee_until_grant: [data.conditions.condition_annual_prosecution_fee_until_grant],
      condition_renewal_fee_from_filing_after_grant: [data.conditions.condition_renewal_fee_from_filing_after_grant],
      prior_pct: [data.conditions.prior_pct],
      prior_pct_same_country: [data.conditions.prior_pct_same_country],
      prev_appl_date_excl_intermediary_time: [data.conditions.prev_appl_date_excl_intermediary_time],
      prior_appl_exists: [data.conditions.prior_appl_exists],
      isa_country_fee_only: [data.conditions.isa_country_fee_only],
      doc_format: [data.conditions.doc_format],
      language: [data.conditions.language],
    })
  }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    this.destroy.next()
    this.destroy.complete()
  }

  save() {
    let submitData = this.condForm.value
    if (submitData.doc_format) {
      if (typeof (submitData.doc_format) !== 'number') {
        submitData.doc_format = submitData.doc_format.id
      }
    }
    if (submitData.language) {
      if (typeof (submitData.language) !== 'number') {
        submitData.language = submitData.language.id
      }
    }

    if (submitData.condition_entity_size) {
      if (typeof (submitData.condition_entity_size) !== 'number') {
        submitData.condition_entity_size = submitData.condition_entity_size.id
      }
    }
    if (submitData.condition_complex) {
      if (typeof (submitData.condition_complex) !== 'number') {
        submitData.condition_complex = submitData.condition_complex.id
      }
    }
    if (submitData.condition_time_complex){
      if (typeof(submitData.condition_time_complex) !== 'number'){
        submitData.condition_time_complex = submitData.condition_time_complex.id
      }
    }
    forIn(submitData, (value, key) => {
      if (value === "") {
        value = null
      } else if (value === 0) {
        value = null
      }
      submitData[key] = value
    })

    this.condSer.update(submitData).subscribe(x => {
      this.dialogRef.close()
    })
  }

  cancel() {
    this.dialogRef.close()
  }
}
