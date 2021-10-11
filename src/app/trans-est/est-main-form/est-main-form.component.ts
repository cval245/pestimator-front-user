import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map} from 'lodash';
import {forkJoin, Subject} from 'rxjs';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {ApplType} from 'src/app/characteristics/_models/applType.model';
import {Country} from 'src/app/characteristics/_models/Country.model';
import {CountryAllService} from 'src/app/characteristics/_services/country-all.service';
import {IAllowEstTemp} from '../_models/AllowEstTemp.model';
import {IConditions} from '../_models/Conditions.model';
import {IFileEstTemp} from '../_models/FileEstTemp.model';
import {IIssueEstTemp} from '../_models/IssueEstTemp.model';
import {ILawFirmEstTemp} from '../_models/LawFirmEstTemp.model';
import {IOAEstTemp} from '../_models/OAEstTemp.model';
import {IPublEstTemp} from '../_models/PublEstTemp.model';
import {AllowEstTempService} from '../_services/allow-est-temp.service';
import {ConditionsService} from '../_services/conditions.service';
import {FileEstTempService} from '../_services/file-est-temp.service';
import {IssueEstTempService} from '../_services/issue-est-temp.service';
import {LawFirmTempService} from '../_services/law-firm-temp.service';
import {OaEstTempService} from '../_services/oa-est-temp.service';
import {PublEstTempService} from '../_services/publ-est-temp.service';
import {IUSOAEstTemp} from "../_models/IUSOAEstTemp";
import {UsOaEstTempService} from "../_services/us-oa-est-temp.service";
import {ApplTypeAllService} from "../../characteristics/_services/appl-type-all.service";
import {EntitySizeService} from "../../characteristics/_services/entity-size.service";
import {EntitySize} from "../../characteristics/_models/entitySize.model";
import {ComplexConditionsService} from "../_services/complex-conditions.service";
import {IComplexConditions} from "../_models/ComplexConditions.model";
import {ComplexTimeConditionsService} from "../../estimation/_services/complex-time-conditions.service";
import {IComplexTimeConditions} from "../_models/IComplexTimeConditions";

interface GenericTemp {
  id: number,
  country: any;
  appl_type: any;
  conditions: any;
  law_firm_template: any;
  official_cost: number;
  date_diff: string;
  description: string;
  fee_code: string;
}

interface CountryWise {
  id: number,
  country: any;
}

interface ApplTypeWise {
  id: number,
  appl_type: any;
}

interface EntitySizeWise {
  id: number,
  condition_entity_size: any;
}

interface OverEntitySizeWise {
  id: number,
  conditions: EntitySizeWise;
}

interface ComplexConditionWise {
  id: number,
  condition_complex: IComplexConditions | number;
}

interface ComplexTimeConditionWise {
  id: number,
  condition_time_complex: IComplexTimeConditions | number;
}

interface OverComplexConditionsWise {
  id: number,
  conditions: ComplexConditionWise;
}

interface OverComplexTimeConditionsWise {
  id: number,
  conditions: ComplexTimeConditionWise;
}

interface ConditionsWise {
  id: number,
  conditions: any;
}

interface LawFirmWise {
  id: number,
  law_firm_template: any;
}


@Component({
  selector: 'app-est-main-form',
  templateUrl: './est-main-form.component.html',
  styleUrls: ['./est-main-form.component.scss']
})
export class EstMainFormComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();
  public countries: Country[] = [new Country(0, '', '', false, false, '', '', [0], [0])]
  public country: Country = new Country(0, '', '', false, false, '', '', [0], [0])
  public applTypes: ApplType[] = [new ApplType(0, '', '', [0])]
  public filEstTemp = new Array<IFileEstTemp>()
  public publEstTemp = new Array<IPublEstTemp>()
  public oaEstTemp = new Array<IOAEstTemp>()
  public usoaEstTemp = new Array<IUSOAEstTemp>()
  public allowEstTemp = new Array<IAllowEstTemp>()
  public issueEstTemp = new Array<IIssueEstTemp>()
  public countryControl = new FormControl()
  public conditions = new Array<IConditions>()
  public complexConditions = new Array<IComplexConditions>()
  public lawFirmTemp = new Array<ILawFirmEstTemp>()
  public country_us: boolean = false;
  public entitySizes = new Array<EntitySize>();
  private country_us_id: number = 0;
  public complexTimeConditions = new Array<IComplexTimeConditions>();

  constructor(
    private countrySer: CountryAllService,
    private filEstSer: FileEstTempService,
    private publEstSer: PublEstTempService,
    private oaEstSer: OaEstTempService,
    private usoaEstSer: UsOaEstTempService,
    private allowEstSer: AllowEstTempService,
    private issueEstSer: IssueEstTempService,
    private applTypeSer: ApplTypeAllService,
    private conditionSer: ConditionsService,
    private complexConditionSer: ComplexConditionsService,
    private complexTimeConditionSer: ComplexTimeConditionsService,
    private lawFirmTempSer: LawFirmTempService,
    private entitySizeSer: EntitySizeService,
  ) {
    this.countrySer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.country_us_id = x.find(y => y.country == 'US')?.id || 0
        this.countries = x
      })
    this.entitySizeSer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.entitySizes = x)

    this.applTypeSer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.applTypes = x)

    this.conditionSer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.conditions = x)

    this.complexConditionSer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.complexConditions = x)

    this.complexTimeConditionSer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.complexTimeConditions = x)

    this.lawFirmTempSer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.lawFirmTemp = x)

    this.countryControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.country = x
        this.country_us = false
        if (x == this.country_us_id) {
          this.country_us = true
        }

        this.filEstSer.setFilter({
          country_id: x
        })
        this.publEstSer.setFilter({
          country_id: x
        })
        this.oaEstSer.setFilter({
          country_id: x
        })
        this.usoaEstSer.setFilter({
          country_id: x
        })
        this.allowEstSer.setFilter({
          country_id: x
        })
        this.issueEstSer.setFilter({
          country_id: x
        })
      })
      this.filEstSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.filEstTemp = this.replaceFkWithObject(x)
      })
      this.publEstSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.publEstTemp = this.replaceFkWithObject(x)
      })
    this.oaEstSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.oaEstTemp = this.replaceFkWithObject(x)
      })
    this.usoaEstSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        //this.usoaEstTemp = this.replaceFkWithObject(x)
        this.usoaEstTemp = this.complexTimeConditionsSet(
          this.complexConditionsSet(this.entitySizeSet(
            this.lawFirmTempSet(this.conditionsSet(
              this.applTypeSet(this.countrySet(x)))))))
      })
    this.allowEstSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.allowEstTemp = this.replaceFkWithObject(x)
      })
    this.issueEstSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.issueEstTemp = this.replaceFkWithObject(x)
      })
  }

  ngOnInit(): void {
    this.countrySer.getAll()
    this.applTypeSer.getAll()
    this.filEstSer.getAll()
    this.publEstSer.getAll()
    this.oaEstSer.getAll()
    this.usoaEstSer.getAll()
    this.allowEstSer.getAll()
    this.issueEstSer.getAll()
    this.conditionSer.getAll()
    this.complexConditionSer.getAll()
    this.complexTimeConditionSer.getAll()
    this.lawFirmTempSer.getAll()
    this.entitySizeSer.getAll()
  }

  replaceFkWithObject(data: GenericTemp[]) {
    return this.complexTimeConditionsSet(this.complexConditionsSet(this.entitySizeSet(
      this.lawFirmTempSet(this.conditionsSet(
        this.applTypeSet(this.countrySet(data)))))))
  }

  countrySet<TCountryWise extends CountryWise>(arg: TCountryWise[]): TCountryWise[] {
    return map<TCountryWise, TCountryWise>(arg, (x: TCountryWise) => {
      let d = this.countries.find(y => y.id == x.country);
      return {...x, 'country': d}
    })
  }

  applTypeSet<TApplTypeWise extends ApplTypeWise>(arg: TApplTypeWise[]): TApplTypeWise[] {
    return map<TApplTypeWise, TApplTypeWise>(arg, (x: TApplTypeWise) => {
      let d = this.applTypes.find(y => y.id == x.appl_type);
      return {...x, 'appl_type': d}
    })
  }

  entitySizeSet<TEntitySizeWise extends OverEntitySizeWise>(arg: TEntitySizeWise[]): TEntitySizeWise[] {
    return map<TEntitySizeWise, TEntitySizeWise>(arg, (x: TEntitySizeWise) => {
      let d = this.entitySizes.find(y => y.id == x.conditions.condition_entity_size);
      let conditions = {...x.conditions, 'condition_entity_size': d}
      return {...x, conditions}
    })
  }

  complexConditionsSet<TComplexCondition extends OverComplexConditionsWise>(arg: TComplexCondition[]): TComplexCondition[] {
    return map<TComplexCondition, TComplexCondition>(arg, (x: TComplexCondition) => {
      let d = this.complexConditions.find(y => y.id == x.conditions.condition_complex);
      let conditions = {...x.conditions, 'condition_complex': d}
      return {...x, conditions}
    })
  }

  complexTimeConditionsSet<TComplexTimeCondition extends OverComplexTimeConditionsWise>(arg: TComplexTimeCondition[]): TComplexTimeCondition[] {
    return map<TComplexTimeCondition, TComplexTimeCondition>(arg, (x: TComplexTimeCondition) => {
      let d = this.complexTimeConditions.find(y => y.id == x.conditions.condition_time_complex);
      let conditions = {...x.conditions, 'condition_time_complex': d}
      return {...x, conditions}
    })
  }


  conditionsSet<TConditionsWise extends ConditionsWise>(arg: TConditionsWise[]): TConditionsWise[] {
    return map<TConditionsWise, TConditionsWise>(arg, (x: TConditionsWise) => {
      let d = this.conditions.find(y => y.id == x.conditions);
      return {...x, 'conditions': d}
    })
  }

  lawFirmTempSet<TLawFirmWise extends LawFirmWise>(arg: TLawFirmWise[]): TLawFirmWise[] {
    return map<TLawFirmWise, TLawFirmWise>(arg, (x: TLawFirmWise) => {
      let d = this.lawFirmTemp.find(y => y.id == x.law_firm_template);
      return {...x, 'law_firm_template': d}
    })
  }

  onSubmitFilEstTemp(formData: IFileEstTemp): void {
    if (formData.id == undefined) {
      let cmb$ = this.addConditionLawFirm(formData.conditions,
        formData.law_firm_template)

      cmb$.pipe(mergeMap(x => {
        formData.conditions = x[0].id
        formData.law_firm_template = x[1].id
        return this.filEstSer.add(formData)
      })).subscribe()

    } else {
      let cmb$ = this.updateConditionLawFirm(formData.conditions,
        formData.law_firm_template)
      cmb$.pipe(mergeMap(x => {
        formData.conditions = x[0].id
        formData.law_firm_template = x[1].id
        return this.filEstSer.update(formData)
      })).subscribe()
    }
  }
  delFileEstTemp(row: IFileEstTemp): void{
    this.filEstSer.delete(row)
  }

  onSubmitPublEstTemp(formData: IPublEstTemp): void {
    if (formData.id == undefined) {
      let cmb$ = this.addConditionLawFirm(formData.conditions,
        formData.law_firm_template)

      cmb$.pipe(mergeMap(x => {
        formData.conditions = x[0].id
        formData.law_firm_template = x[1].id
        return this.publEstSer.add(formData)
      })).subscribe()

    } else {
      let cmb$ = this.updateConditionLawFirm(formData.conditions,
        formData.law_firm_template)
      cmb$.pipe(mergeMap(x => {
        formData.conditions = x[0].id
        formData.law_firm_template = x[1].id
        return this.publEstSer.update(formData)
      })).subscribe()
    }
  }
  delPublEstTemp(row: IPublEstTemp): void{
    this.publEstSer.delete(row)
  }

  onSubmitOAEstTemp(formData: IOAEstTemp): void {
    if (formData.id == undefined) {
      let cmb$ = this.addConditionLawFirm(formData.conditions,
        formData.law_firm_template)

      cmb$.pipe(mergeMap(x => {
        formData.conditions = x[0].id
        formData.law_firm_template = x[1].id
        return this.oaEstSer.add(formData)
      })).subscribe()

    } else {
      let cmb$ = this.updateConditionLawFirm(formData.conditions,
        formData.law_firm_template)
      cmb$.pipe(mergeMap(x => {
        formData.conditions = x[0].id
        formData.law_firm_template = x[1].id
        return this.oaEstSer.update(formData)
      })).subscribe()
    }
  }

  delOAEstTemp(row: IOAEstTemp): void {
    this.oaEstSer.delete(row)
  }

  // for us oa estimates because extra column
  onSubmitUSOAEstTemp(formData: IUSOAEstTemp): void {
    if (formData.id == undefined) {
      let cmb$ = this.addConditionLawFirm(formData.conditions,
        formData.law_firm_template)

      cmb$.pipe(mergeMap(x => {
        formData.conditions = x[0].id
        formData.law_firm_template = x[1].id
        return this.usoaEstSer.add(formData)
      })).subscribe()

    } else {
      let cmb$ = this.updateConditionLawFirm(formData.conditions,
        formData.law_firm_template)
      cmb$.pipe(mergeMap(x => {
        formData.conditions = x[0].id
        formData.law_firm_template = x[1].id
        return this.usoaEstSer.update(formData)
      })).subscribe()
    }
  }

  delUSOAEstTemp(row: IUSOAEstTemp): void {
    this.usoaEstSer.delete(row)
  }


  onSubmitAllowEstTemp(formData: IAllowEstTemp): void {
    if (formData.id == undefined) {
      let cmb$ = this.addConditionLawFirm(formData.conditions,
        formData.law_firm_template)

      cmb$.pipe(mergeMap(x => {
        formData.conditions = x[0].id
        formData.law_firm_template = x[1].id
        return this.allowEstSer.add(formData)
      })).subscribe()

    } else {
      let cmb$ = this.updateConditionLawFirm(formData.conditions,
        formData.law_firm_template)
      cmb$.pipe(mergeMap(x => {
        formData.conditions = x[0].id
        formData.law_firm_template = x[1].id
        return this.allowEstSer.update(formData)
      })).subscribe()
    }
  }
  delAllowEstTemp(row: IAllowEstTemp): void{
    this.allowEstSer.delete(row)
  }

  onSubmitIssueEstTemp(formData: IIssueEstTemp): void {
    if (formData.id == undefined) {
      let cmb$ = this.addConditionLawFirm(formData.conditions,
        formData.law_firm_template)

      cmb$.pipe(mergeMap(x => {
        formData.conditions = x[0].id
        formData.law_firm_template = x[1].id
        return this.issueEstSer.add(formData)
      })).subscribe()

    } else {
      let cmb$ = this.updateConditionLawFirm(formData.conditions,
        formData.law_firm_template)
      cmb$.pipe(mergeMap(x => {
        formData.conditions = x[0].id
        formData.law_firm_template = x[1].id
        return this.issueEstSer.update(formData)
      })).subscribe()
    }
  }
  delIssueEstTemp(row: IIssueEstTemp): void{
    this.issueEstSer.delete(row)
  }

  updateConditionLawFirm(conditions: IConditions, law_firm_template: ILawFirmEstTemp ){
    let condition$ = this.conditionSer.update(conditions)
    let lawFirmTemp$ = this.lawFirmTempSer.update(law_firm_template)
    return forkJoin([condition$, lawFirmTemp$])
  }

  addConditionLawFirm(conditions: IConditions, law_firm_template: ILawFirmEstTemp) {
    let condition$ = this.conditionSer.add(conditions)
    let lawFirmTemp$ = this.lawFirmTempSer.add(law_firm_template)
    return forkJoin([condition$, lawFirmTemp$])
  }
}
