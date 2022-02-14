import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {cloneDeep, find, forEach, map} from 'lodash';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ApplType} from 'src/app/_models/applType.model';
import {CountryAllService} from 'src/app/_services/country-all.service';
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
import {ApplTypeAllService} from "../../_services/appl-type-all.service";
import {CountryAll} from "../../_models/CountryAll.model";
import {LanguageService} from "../../_services/language.service";
import {Language} from "../../_models/Language.model";
import {ITransComplexTime} from "../_models/TransComplexTime";
import {TransComplexTimeService} from "../_services/trans-complex-time.service";
import {EpValidationTranslationRequiredService} from "../../_services/ep-validation-translation-required.service";
import {IEPValidationTranslationRequired} from "../../_models/IEPValidationTranslationRequired.model";
import {EntitySizeService} from "../../_services/entity-size.service";
import {EntitySize} from "../../_models/entitySize.model";
import {TransFilingRequirementsService} from "../_services/trans-filing-requirements.service";
import {ITransFilReq, ITransFilReqFull} from "../_models/TransFilReq.model";
import {RequestExamTransService} from "../_services/request-exam-trans.service";
import {IRequestExamTrans} from "../_models/RequestExamTrans.model";
import {DocFormatService} from "../../_services/doc-format.service";
import {IDocFormat} from "../../_models/DocFormat.model";
import {IDocFormatCountry} from "../../_models/DocFormatCountry.model";
import {DocFormatCountryService} from "../../_services/doc-format-country.service";

interface CountryWise {
  id: number,
  country: any;
}

interface ApplTypeWise {
  id: number,
  appl_type: any;
}

interface PrevApplTypeWise {
  id: number,
  prev_appl_type: any;
}

interface ComplexTimeWise {
  id: number,
  trans_complex_time_condition: any;
}

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();//  = new Subject<void>;
  public countries: CountryAll[] = [new CountryAll()]
  public applTypes: ApplType[] = [new ApplType()]
  public cstmFilTrans = new Array<ICustomFilTrans>()
  public publTrans = new Array<IPublTrans>()
  public reqTrans = new Array<IRequestExamTrans>()
  public oaTrans = new Array<IOATrans>()
  public allowTrans = new Array<IAllowTrans>()
  public issueTrans = new Array<IIssueTrans>()
  public transComplexTimes = new Array<ITransComplexTime>()
  public oaNum = new Array<ICountryOANum>()
  public countryControl = new FormControl()
  public country: CountryAll = new CountryAll()
  public languages: Language[] = new Array<Language>();
  public entitySizes: EntitySize[] = [new EntitySize()]
  public docFormats: IDocFormat[] = new Array<IDocFormat>()
  public docFormatCountries: IDocFormatCountry[] = new Array<IDocFormatCountry>()
  public countryRequirements = new Array<ITransFilReqFull>()
  public epValidationTranslate: IEPValidationTranslationRequired[] = new Array<IEPValidationTranslationRequired>();
  public reqs: ITransFilReqFull = {} as ITransFilReqFull;

  constructor(
    private countrySer: CountryAllService,
    private cstmFilSer: CustomFilTransService,
    private publTranSer: PublTransService,
    private reqTranSer: RequestExamTransService,
    private oaTranSer: OaTransService,
    private allowTranSer: AllowTransService,
    private issueTranSer: IssueTransService,
    private oaNumSer: CountryOanumService,
    private applTypeSer: ApplTypeAllService,
    private languageSer: LanguageService,
    private transComplexTimeSer: TransComplexTimeService,
    private epValidatSer: EpValidationTranslationRequiredService,
    private entSer: EntitySizeService,
    private docFormatSer: DocFormatService,
    private docFormatCountrySer: DocFormatCountryService,
    private tranFilReqSer: TransFilingRequirementsService,
  ) {
    combineLatest([
      this.applTypeSer.getAllUnlessAlreadyLoaded(),
      this.countrySer.getAllUnlessAlreadyLoaded(),
      this.tranFilReqSer.getData(),
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([applTypes, countries, reqs ]) =>{
        forEach(reqs, (y: ITransFilReq) => {
          let cTrans = {country: find(countries, (z: CountryAll) => y.country == z.id)!}//, required_transforms: []}
          let required_transforms: {appl_type: ApplType, prev_appl_type: ApplType}[] = []
          forEach(y.required_transforms, z => {
            let appl_type = find(applTypes, x => x.id == z.appl_type)!
            let prev_appl_type = find(applTypes, x => x.id == z.prev_appl_type)!
            required_transforms.push({appl_type: appl_type, prev_appl_type: prev_appl_type})
          })
          this.countryRequirements.push({...cTrans, required_transforms: required_transforms})
        })
      })

    this.docFormatSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.docFormats = x
      })
    this.docFormatCountrySer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.docFormatCountries = x
      })

    this.entSer.entities$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.entitySizes = x
      })
    this.epValidatSer.entities$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.epValidationTranslate = x
      })
    this.transComplexTimeSer.entities$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.transComplexTimes = x
      })
    this.languageSer.entities$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.languages = x
      })
    this.countrySer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.countries = x.sort((a,b) =>{
          let countryA = a.country.toUpperCase()
          let countryB = b.country.toUpperCase()
          if(countryA < countryB){
            return -1;
          }
          if (countryA > countryB){
            return 1;
          }
          return 0;
        })
      })

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
        this.reqTranSer.setFilter({
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
        if (this.countryRequirements.length > 0) {
          this.reqs = find(this.countryRequirements, y => y.country.id == x)!
        }
      })
      this.cstmFilSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.cstmFilTransSet(x)
      })
      this.publTranSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.publTrans = this.complexTimeConditionsSet(this.prevApplTypeSet(this.applTypeSet(this.countrySet(x))))
        console.log('ths', this.publTrans)
      })
      this.reqTranSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.reqTrans = this.complexTimeConditionsSet(this.prevApplTypeSet(this.applTypeSet(this.countrySet(x))))
      })
      this.oaTranSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {

        this.oaTrans = this.complexTimeConditionsSet(this.prevApplTypeSet(this.applTypeSet(this.countrySet(x))))
      })
      this.allowTranSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.allowTrans = this.complexTimeConditionsSet(this.prevApplTypeSet(this.applTypeSet(this.countrySet(x))))
      })
      this.issueTranSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.issueTrans = this.complexTimeConditionsSet(this.prevApplTypeSet(this.applTypeSet(this.countrySet(x))))
      })
      this.oaNumSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.oaNum = this.prevApplTypeSet(this.applTypeSet(this.countrySet(x)))
      })
  }

  ngOnInit(): void {
    this.cstmFilSer.getAll()
    this.countrySer.getAll()
    this.publTranSer.getAll()
    this.reqTranSer.getAll()
    this.oaTranSer.getAll()
    this.allowTranSer.getAll()
    this.issueTranSer.getAll()
    this.applTypeSer.getAll()
    this.oaNumSer.getAll()
    this.languageSer.getAll()
    this.transComplexTimeSer.getAll()
    this.epValidatSer.getAll()
    this.entSer.getAll()
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
    let timeComplexConditions = this.transComplexTimes.find(b => b.id == x.trans_complex_time_condition)
    return {
      ...x, 'country': d,
      'appl_type': applType,
      'prev_appl_type': prevApplType,
      'trans_complex_time_condition': timeComplexConditions,
    }
  })
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

  prevApplTypeSet<TPrevApplTypeWise extends PrevApplTypeWise>(arg: TPrevApplTypeWise[]): TPrevApplTypeWise[] {
    return map<TPrevApplTypeWise, TPrevApplTypeWise>(arg, (x: TPrevApplTypeWise) => {
      let d = this.applTypes.find(y => y.id == x.prev_appl_type);
      return {...x, 'prev_appl_type': d}
    })
  }

  complexTimeConditionsSet<TcomplexTimeWide extends ComplexTimeWise>(arg: TcomplexTimeWide[]): TcomplexTimeWide[] {
    return map<TcomplexTimeWide, TcomplexTimeWide>(arg, (x: TcomplexTimeWide) => {
      let d = this.transComplexTimes.find(y => y.id == x.trans_complex_time_condition);
      return {...x, 'trans_complex_time_condition': d}
    })
  }

  onSubmitPublTrans(formData: IPublTrans): void {
    if (formData.id == undefined) {
      this.publTranSer.add(formData)
    } else {
      this.publTranSer.update(formData)
    }
  }

  delPublTrans(row: IPublTrans): void {
    this.publTranSer.delete(row)
  }

  onSubmitReqTrans(formData: IRequestExamTrans): void {
    if (formData.id == undefined) {
      this.reqTranSer.add(formData)
    } else {
      this.reqTranSer.update(formData)
    }
  }
  delReqTrans(row: IRequestExamTrans): void{
    this.reqTranSer.delete(row)
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
      this.countrySer.update(formData).subscribe(x => {
        let countries = cloneDeep(this.countries)
        let countryI = this.countries.findIndex(y => y.id == x.id)
        countries[countryI] = x
        this.countries = countries
        this.country=x
      })
    }
  }
}
