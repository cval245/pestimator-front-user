import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'lodash';
import { combineLatest, forkJoin, Observable, of, Subject } from 'rxjs';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { ApplType } from 'src/app/characteristics/_models/applType.model';
import { Country } from 'src/app/characteristics/_models/Country.model';
import { ApplTypeService } from 'src/app/characteristics/_services/appl-type.service';
import { CountryAllService } from 'src/app/characteristics/_services/country-all.service';
import { CountryService } from 'src/app/characteristics/_services/country.service';
import { IAllowEstTemp } from '../_models/AllowEstTemp.model';
import { IConditions } from '../_models/Conditions.model';
import { IFileEstTemp } from '../_models/FileEstTemp.model';
import { IIssueEstTemp } from '../_models/IssueEstTemp.model';
import { ILawFirmEstTemp } from '../_models/LawFirmEstTemp.model';
import { IOAEstTemp } from '../_models/OAEstTemp.model';
import { IPublEstTemp } from '../_models/PublEstTemp.model';
import { AllowEstTempService } from '../_services/allow-est-temp.service';
import { ConditionsService } from '../_services/conditions.service';
import { FileEstTempService } from '../_services/file-est-temp.service';
import { IssueEstTempService } from '../_services/issue-est-temp.service';
import { LawFirmTempService } from '../_services/law-firm-temp.service';
import { OaEstTempService } from '../_services/oa-est-temp.service';
import { PublEstTempService } from '../_services/publ-est-temp.service';

interface CountryWise{
    id: number,
    country: any;
  }

interface ApplTypeWise{
    id: number,
    appl_type: any;
  }

interface ConditionsWise{
    id: number,
    conditions: any;
  }

interface LawFirmWise{
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
  public countries: Country[] = [new Country(0, '', '')]
  public country: Country = new Country(0, '', '')
  public applTypes: ApplType[] = [new ApplType()]
  public filEstTemp = new Array<IFileEstTemp>()
  public publEstTemp = new Array<IPublEstTemp>()
  public oaEstTemp = new Array<IOAEstTemp>()
  public allowEstTemp = new Array<IAllowEstTemp>()
  public issueEstTemp = new Array<IIssueEstTemp>()
  public countryControl = new FormControl()
  public conditions = new Array<IConditions>()
  public lawFirmTemp = new Array<ILawFirmEstTemp>()
  
  constructor(
    private countrySer: CountryAllService,
    private filEstSer: FileEstTempService,
    private publEstSer: PublEstTempService,
    private oaEstSer: OaEstTempService,
    private allowEstSer: AllowEstTempService,
    private issueEstSer: IssueEstTempService,
    private applTypeSer: ApplTypeService,
    private conditionSer: ConditionsService,
    private lawFirmTempSer: LawFirmTempService,
  ) { 
    this.countrySer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.countries = x) 

    this.applTypeSer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.applTypes = x)

    this.conditionSer.entities$ 
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.conditions = x)
   
    this.lawFirmTempSer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.lawFirmTemp = x)
    
    this.countryControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.country = x

        this.filEstSer.setFilter({
          country_id: x
        })
        this.publEstSer.setFilter({
          country_id: x
        })
        this.oaEstSer.setFilter({
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
        console.log('frf', x)
        this.filEstTemp = this.lawFirmTempSet(this.conditionsSet(
                      this.applTypeSet(this.countrySet(x))))
        console.log('frf', this.filEstTemp)
      })
      this.publEstSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.publEstTemp = this.lawFirmTempSet(this.conditionsSet(
          this.applTypeSet(this.countrySet(x))))
      })
      this.oaEstSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.oaEstTemp = this.lawFirmTempSet(this.conditionsSet(
          this.applTypeSet(this.countrySet(x))))
      })
      this.allowEstSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.allowEstTemp = this.lawFirmTempSet(this.conditionsSet(
          this.applTypeSet(this.countrySet(x))))
      })
      this.issueEstSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.issueEstTemp = this.lawFirmTempSet(this.conditionsSet(
          this.applTypeSet(this.countrySet(x))))
      })
  }

  ngOnInit(): void{
    this.countrySer.getAll()
    this.applTypeSer.getAll()
    this.filEstSer.getAll()
    this.publEstSer.getAll()
    this.oaEstSer.getAll()
    this.allowEstSer.getAll()
    this.issueEstSer.getAll()
    this.conditionSer.getAll()
    this.lawFirmTempSer.getAll()
  }

  countrySet<TCountryWise extends CountryWise>(arg: TCountryWise[]): TCountryWise[] 
  {
    let modArg = map<TCountryWise, TCountryWise>(arg, (x: TCountryWise) => {
        let d = this.countries.find(y => y.id == x.country);
        console.log('xxx', d)
        return {...x, 'country': d}
      }) 
    return modArg
  }

  applTypeSet<TApplTypeWise extends ApplTypeWise>(arg: TApplTypeWise[]): TApplTypeWise[] 
  {
    let modArg = map<TApplTypeWise, TApplTypeWise>(arg, (x: TApplTypeWise) => {
        console.log('lol', this.applTypes)
        let d = this.applTypes.find(y => y.id == x.appl_type);
        console.log('ddd', d)
        return {...x, 'appl_type': d}
      }) 
    return modArg
  }

  conditionsSet<TConditionsWise extends ConditionsWise>(arg: TConditionsWise[]): TConditionsWise[] 
  {
    let modArg = map<TConditionsWise, TConditionsWise>(arg, (x: TConditionsWise) => {
        let d = this.conditions.find(y => y.id == x.conditions);
        console.log('xxx', d)
        return {...x, 'conditions': d}
      }) 
    return modArg
  }

  lawFirmTempSet<TLawFirmWise extends LawFirmWise>(arg: TLawFirmWise[]): TLawFirmWise[] 
  {
    let modArg = map<TLawFirmWise, TLawFirmWise>(arg, (x: TLawFirmWise) => {
        let d = this.lawFirmTemp.find(y => y.id == x.law_firm_template);
        console.log('xxx', d)
        return {...x, 'law_firm_template': d}
      }) 
    return modArg
  }

  onSubmitFilEstTemp(formData: IFileEstTemp): void{
    if (formData.id == undefined){
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

  onSubmitPublEstTemp(formData: IPublEstTemp): void{
    if (formData.id == undefined){
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

  onSubmitOAEstTemp(formData: IOAEstTemp): void{
    if (formData.id == undefined){
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
  delOAEstTemp(row: IOAEstTemp): void{
    this.oaEstSer.delete(row)
  }

  onSubmitAllowEstTemp(formData: IAllowEstTemp): void{
    if (formData.id == undefined){
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

  onSubmitIssueEstTemp(formData: IIssueEstTemp): void{
    if (formData.id == undefined){
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
