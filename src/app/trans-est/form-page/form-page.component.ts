import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map} from 'lodash';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ApplType} from 'src/app/characteristics/_models/applType.model';
import {CountryAllService} from 'src/app/characteristics/_services/country-all.service';
import {IAllowTrans} from '../_models/AllowTrans.model';
import {ICountryOANum} from '../_models/CountryOANum.model';
import {ICustomFilTrans} from '../_models/CustomFilTrans.model';
import {IIssueTrans} from '../_models/IssueTrans.model';
import {IOATrans} from '../_models/OATrans.model';
import {IPublTrans} from '../_models/PublTrans.model';
import {AllowTransService} from '../_services/allow-trans.service';
import {CountryOanumService} from '../_services/country-oanum.service';
import {CustomFilTransService} from '../_services/custom-fil-trans.service';
import {IssueTransService} from '../_services/issue-trans.service';
import {OaTransService} from '../_services/oa-trans.service';
import {PublTransService} from '../_services/publ-trans.service';
import {ApplTypeAllService} from "../../characteristics/_services/appl-type-all.service";
import {CountryAll} from "../../characteristics/_models/CountryAll.model";

interface CountryWise {
  id: number,
  country: any;
}

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();//  = new Subject<void>;
  public countries: CountryAll[] = [new CountryAll(0, '', '', false, false, false, '', '', [0], [0])]
  public applTypes: ApplType[] = [new ApplType(0, '', '', [0])]
  public cstmFilTrans = new Array<ICustomFilTrans>()
  public publTrans = new Array<IPublTrans>()
  public oaTrans = new Array<IOATrans>()
  public allowTrans = new Array<IAllowTrans>()
  public issueTrans = new Array<IIssueTrans>()
  public oaNum = new Array<ICountryOANum>()
  public countryControl = new FormControl()
  public country: CountryAll = new CountryAll(0, '', '', false, false, false, '', '', [0], [0])

  constructor(
    private countrySer: CountryAllService,
    private cstmFilSer: CustomFilTransService,
    private publTranSer: PublTransService,
    private oaTranSer: OaTransService,
    private allowTranSer: AllowTransService,
    private issueTranSer: IssueTransService,
    private oaNumSer: CountryOanumService,
    private applTypeSer: ApplTypeAllService,
    ) {
    this.countrySer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.countries = x)

      this.applTypeSer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.applTypes = x)

    this.countryControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((x: number) => {
        this.country = this.countries.find(y => y.id == x)!
        this.cstmFilSer.setFilter({
          country_id: x
        })
        this.publTranSer.setFilter({
          country_id: x
        })
        this.oaTranSer.setFilter({
          country_id: x
        })
        this.allowTranSer.setFilter({
          country_id: x
        })
        this.issueTranSer.setFilter({
          country_id: x
        })
        this.oaNumSer.setFilter({
          country_id: x
        })
      })
      this.cstmFilSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.cstmFilTransSet(x)
      })
      this.publTranSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.publTrans = this.countrySet(x)
      })
      this.oaTranSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.oaTrans = this.countrySet(x)
      })
      this.allowTranSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.allowTrans = this.countrySet(x)
      })
      this.issueTranSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.issueTrans = this.countrySet(x)
      })
      this.oaNumSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.oaNum = this.countrySet(x)
      })
  }

  ngOnInit(): void {
    this.cstmFilSer.getAll()
    this.countrySer.getAll()
    this.publTranSer.getAll()
    this.oaTranSer.getAll()
    this.allowTranSer.getAll()
    this.issueTranSer.getAll()
    this.applTypeSer.getAll()
    this.oaNumSer.getAll()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  cstmFilTransSet(cstmFilTrans: ICustomFilTrans[]){
  this.cstmFilTrans = map(cstmFilTrans, (x: ICustomFilTrans) => {
    let d = this.countries.find(y => y.id == x.country);
    let applType = this.applTypes.find(z => z.id == x.appl_type)
    let prevApplType = this.applTypes.find(a => a.id == x.prev_appl_type)
    return {
      ...x, 'country': d,
      'appl_type': applType,
      'prev_appl_type': prevApplType,
    }
  })
  }

  countrySet<TCountryWise extends CountryWise>(arg: TCountryWise[]): TCountryWise[] {
    return map<TCountryWise, TCountryWise>(arg, (x: TCountryWise) => {
      let d = this.countries.find(y => y.id == x.country);
      return {...x, 'country': d}
    })
  }


  onSubmitPublTrans(formData: IPublTrans): void {
    if (formData.id == undefined) {
      this.publTranSer.add(formData)
    } else {
      this.publTranSer.update(formData)
    }
  }
  delPublTrans(row: IPublTrans): void{
    this.publTranSer.delete(row)
  }

  onSubmitOATrans(formData: IOATrans): void {
    if (formData.id == undefined){
      this.oaTranSer.add(formData)
    } else {
      this.oaTranSer.update(formData)
    }
  }
  delOATrans(row: IOATrans): void{
    this.oaTranSer.delete(row)
  }

  onSubmitAllowTrans(formData: IAllowTrans): void {
    if (formData.id == undefined){
      this.allowTranSer.add(formData)
    } else {
      this.allowTranSer.update(formData)
    }
  }
  delAllowTrans(row: IAllowTrans): void{
    this.allowTranSer.delete(row)
  }

  onSubmitIssueTrans(formData: IIssueTrans): void {
    if (formData.id == undefined){
      this.issueTranSer.add(formData)
    } else {
      this.issueTranSer.update(formData)
    }
  }
  delIssueTrans(row: IIssueTrans): void{
    this.issueTranSer.delete(row)
  }

  onSubmitCstmFilTrans(formData: ICustomFilTrans): void{
    if (formData.id == undefined){
      this.cstmFilSer.add(formData)
    } else {
      this.cstmFilSer.update(formData)
    }
  }

  delCstmFilTrans(row: ICustomFilTrans): void{
    this.cstmFilSer.delete(row)
  }

  onSubmitOanum(formData: ICountryOANum): void{
    if (formData.id == undefined){
      this.oaNumSer.add(formData)
    } else {
      this.oaNumSer.update(formData)
    }
  }

  delOanum(row: ICountryOANum): void {
    this.oaNumSer.delete(row)
  }

  submitCountryForm(formData: CountryAll) {
    if (formData.id == undefined) {
      this.countrySer.add(formData)
    } else {
      this.countrySer.update(formData)
    }
  }
}
