import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map} from 'lodash';
import {combineLatest, forkJoin, Subject} from 'rxjs';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {ApplType} from 'src/app/_models/applType.model';
import {Country} from 'src/app/_models/Country.model';
import {CountryAllService} from 'src/app/_services/country-all.service';
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
import {ApplTypeAllService} from "../../_services/appl-type-all.service";
import {EntitySizeService} from "../../_services/entity-size.service";
import {EntitySize} from "../../_models/entitySize.model";
import {ComplexConditionsService} from "../_services/complex-conditions.service";
import {IComplexConditions} from "../_models/ComplexConditions.model";
import {ComplexTimeConditionsService} from "../../_services/complex-time-conditions.service";
import {IComplexTimeConditions} from "../_models/IComplexTimeConditions";
import {CurrencyService} from "../../_services/currency.service";
import {Currency} from "../../_models/Currency.model";
import {TemplatePortal} from "@angular/cdk/portal";
import {Overlay, OverlayConfig,} from "@angular/cdk/overlay";
import {RequestExamTempService} from "../_services/request-exam-temp.service";
import {IRequestExamEstTemp} from "../_models/RequestExamEstTemp.model";
import {DocFormatService} from "../../_services/doc-format.service";
import {IDocFormat} from "../../_models/DocFormat.model";
import {FeeCategoryService} from "../_services/fee-category.service";
import {IFeeCategory} from "../_models/FeeCategory.model";
import {Language} from "../../_models/Language.model";
import {LanguageService} from "../../_services/language.service";
import {DetailedFeeCategoryService} from "../_services/detailed-fee-category.service";
import {IDetailedFeeCategory} from "../_models/DetailedFeeCategory.model";
import {convertIBaseEst, convertIBaseEstToSubmit, IBaseEstTemp, IBaseEstTempSubmit} from "../_models/BaseEstTemp.model";

interface GenericTemp {
  id: number,
  country: any;
  appl_type: any;
  conditions: any;
  law_firm_template: any;
  official_cost: number;
  official_cost_currency: string;
  date_diff: string;
  description: string;
  fee_code: string;
  isa_country_fee_only: boolean;
  fee_category: any;
  detailed_fee_category: any;
  date_enabled: Date;
  date_disabled: Date;
}

enum ServiceEnum {
  FileEstTemp = 'FileEstTemp',
  PublEstTemp = 'PublEstTemp',
  OAEstTemp = 'OAEstTemp',
  USOAEstTemp = 'OAEstTemp',
  AllowEstTemp = 'AllowEstTemp',
  IssueEstTemp = 'IssueEstTemp',
  RequestExamEstTemp = 'RequestExamEstTemp',
}

interface NamedWise {
  id: number,
  name: string
}


@Component({
  selector: 'app-est-main-form',
  templateUrl: './est-main-form.component.html',
  styleUrls: ['./est-main-form.component.scss']
})
export class EstMainFormComponent implements OnInit, AfterViewInit {

  private unsubscribe$ = new Subject<void>();
  public countries: Country[] = [new Country()]
  public country: Country = new Country()
  public applTypes: ApplType[] = [new ApplType()]
  public filEstTemp = new Array<IFileEstTemp>()
  public publEstTemp = new Array<IPublEstTemp>()
  public reqEstTemp = new Array<IRequestExamEstTemp>();
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
  public feeCategories: IFeeCategory[] = new Array<IFeeCategory>();
  public detailedFeeCategories: IDetailedFeeCategory[] = new Array<IDetailedFeeCategory>();
  public filteredDetailedFeeCategories: IDetailedFeeCategory[] = new Array<IDetailedFeeCategory>();
  private country_us_id: number = 0;
  public complexTimeConditions = new Array<IComplexTimeConditions>();
  public currencies: Currency[] = new Array<Currency>();
  public languages: Language[] = new Array<Language>();
  public currencies_list: string[] = new Array<string>();
  public docFormats: IDocFormat[] = new Array<IDocFormat>();
  public conditionsChangedObs: Subject<IConditions[]> = new Subject()
  //@ts-ignore
  @ViewChild('templatePortalContent') templatePortalContent: TemplateRef<unknown>;

  //@ts-ignore
  templatePortal: TemplatePortal<any>;

  constructor(
    private countrySer: CountryAllService,
    private filEstSer: FileEstTempService,
    private publEstSer: PublEstTempService,
    private reqEstSer: RequestExamTempService,
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
    private currencySer: CurrencyService,
    private docFormatSer: DocFormatService,
    private languageSer: LanguageService,
    private feeCatSer: FeeCategoryService,
    private detailedFeeCatSer: DetailedFeeCategoryService,
    private _viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
  ) {
    combineLatest([
      combineLatest([this.countrySer.getAllUnlessAlreadyLoaded()]),
      combineLatest([
        this.docFormatSer.getAllUnlessAlreadyLoaded(),
        this.languageSer.getAllUnlessAlreadyLoaded(),
        this.complexConditionSer.getAllUnlessAlreadyLoaded(),
        this.complexTimeConditionSer.getAllUnlessAlreadyLoaded(),
        this.entitySizeSer.getAllUnlessAlreadyLoaded(),
        this.conditionSer.getAllUnlessAlreadyLoaded(),
      ])
    ])
      .pipe(takeUntil(this.unsubscribe$)).subscribe(
      ([
         [countries],
         [
           docFormats,
           languages,
           complexConditions,
           complexTimeConditions,
           entitySizes,
           conditions,
         ]]) => {
        this.docFormats = EstMainFormComponent.formatDocFormats(docFormats)
        this.languages = EstMainFormComponent.formatLanguages(languages)
        this.complexConditions = EstMainFormComponent.formatComplexConditions(complexConditions)
        this.complexTimeConditions = EstMainFormComponent.formatComplexTimeConditions(complexTimeConditions)
        this.entitySizes = EstMainFormComponent.formatEntitySizes(entitySizes)
        this.conditions = conditions.map(x => {
          return {
            ...x,
            condition_entity_size: this.entitySizes.find(y => y.id == x.condition_entity_size),
            condition_complex: this.complexConditions.find(y => y.id == x.condition_complex),
            condition_time_complex: this.complexTimeConditions.find(y => y.id == x.condition_time_complex),
            language: this.languages.find(y => y.id == x.language),
            doc_format: this.docFormats.find(y => y.id == x.doc_format),
          }
        })
        this.conditionsChangedObs.next(this.conditions)
        this.countries = EstMainFormComponent.formatCountries(countries)
      })
    this.feeCatSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.feeCategories = x
      })
    this.detailedFeeCatSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.detailedFeeCategories = EstMainFormComponent.nameSort(x)
      })
    this.currencySer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.currencies = x
        this.currencies_list = map(x, y => y.currency_name).sort()
      })

    this.applTypeSer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.applTypes = x)


    this.lawFirmTempSer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.lawFirmTemp = x
      })

    this.countryControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.country = this.countries.find(y => y.id == x)!
        this.filteredDetailedFeeCategories = this.detailedFeeCategories.filter(y => y.country == x)
        this.country_us = x == this.country_us_id;
        this.setFilters(x)
      })
    combineLatest([this.filEstSer.filteredEntities$, this.conditionsChangedObs, this.lawFirmTempSer.entities$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([ests, conditions, lawFirms]) => {
        this.filEstTemp = this.fillInEstRows(ests, conditions, lawFirms)
      })

    combineLatest([this.publEstSer.filteredEntities$, this.conditionsChangedObs, this.lawFirmTempSer.entities$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([ests, conditions, lawFirms]) => {
        this.publEstTemp = this.fillInEstRows(ests, conditions, lawFirms)
      })

    combineLatest([this.reqEstSer.filteredEntities$, this.conditionsChangedObs, this.lawFirmTempSer.entities$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([ests, conditions, lawFirms]) => {
        this.reqEstTemp = this.fillInEstRows(ests, conditions, lawFirms)
      })

    combineLatest([this.oaEstSer.filteredEntities$, this.conditionsChangedObs, this.lawFirmTempSer.entities$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([ests, conditions, lawFirms]) => {
        this.oaEstTemp = this.fillInEstRows(ests, conditions, lawFirms)
      })

    combineLatest([this.usoaEstSer.filteredEntities$, this.conditionsChangedObs, this.lawFirmTempSer.entities$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([ests, conditions, lawFirms]) => {
        this.usoaEstTemp = this.fillInEstRows(ests, conditions, lawFirms)
      })

    combineLatest([this.allowEstSer.filteredEntities$, this.conditionsChangedObs, this.lawFirmTempSer.entities$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([ests, conditions, lawFirms]) => {
        this.allowEstTemp = this.fillInEstRows(ests, conditions, lawFirms)
      })

    combineLatest([this.issueEstSer.filteredEntities$, this.conditionsChangedObs, this.lawFirmTempSer.entities$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([ests, conditions, lawFirms]) => {
        this.issueEstTemp = this.fillInEstRows(ests, conditions, lawFirms)
      })
  }


  ngOnInit(): void {
    this.filEstSer.getAll()
    this.publEstSer.getAll()
    this.reqEstSer.getAll()
    this.oaEstSer.getAll()
    this.usoaEstSer.getAll()
    this.allowEstSer.getAll()
    this.issueEstSer.getAll()
    this.conditionSer.getAll()
    this.lawFirmTempSer.getAll()
  }

  ngAfterViewInit() {
    let positionStrategy = this.overlay.position()
      .global().right('5px').top('70px')
    let scrollStrategy = this.overlay.scrollStrategies.reposition()
    let overlayConfig: OverlayConfig = {
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy
    }
    const overlayRef = this.overlay.create(overlayConfig)
    this.templatePortal = new TemplatePortal(
      this.templatePortalContent,
      this._viewContainerRef
    );
    overlayRef.attach(this.templatePortal)
  }

  fillInEstRows<T extends IBaseEstTempSubmit>(estRows: T[], conditions: IConditions[], lawFirmTemps: ILawFirmEstTemp[]) {
    return estRows.map(row => {
      return convertIBaseEst(row,
        this.countries,
        this.applTypes,
        conditions,
        lawFirmTemps,
        this.feeCategories,
        this.detailedFeeCategories)
    })
  }

  setFilters(country_id: number) {
    this.filEstSer.setFilter({
      country_id: country_id
    })
    this.publEstSer.setFilter({
      country_id: country_id
    })
    this.reqEstSer.setFilter({
      country_id: country_id
    })
    this.oaEstSer.setFilter({
      country_id: country_id
    })
    this.usoaEstSer.setFilter({
      country_id: country_id
    })
    this.allowEstSer.setFilter({
      country_id: country_id
    })
    this.issueEstSer.setFilter({
      country_id: country_id
    })
  }


  onSubmitFilEstTemp(formData: IFileEstTemp): void {
    this.onSubmitGeneric(formData, ServiceEnum.FileEstTemp)
  }

  onSubmitPublEstTemp(formData: IFileEstTemp): void {
    this.onSubmitGeneric(formData, ServiceEnum.PublEstTemp)
  }

  onSubmitOAEstTemp(formData: IFileEstTemp): void {
    this.onSubmitGeneric(formData, ServiceEnum.OAEstTemp)
  }

  onSubmitUSOAEstTemp(formData: IFileEstTemp): void {
    this.onSubmitGeneric(formData, ServiceEnum.USOAEstTemp)
  }

  onSubmitReqEstTemp(formData: IFileEstTemp): void {
    this.onSubmitGeneric(formData, ServiceEnum.RequestExamEstTemp)
  }

  onSubmitAllowEstTemp(formData: IFileEstTemp): void {
    this.onSubmitGeneric(formData, ServiceEnum.AllowEstTemp)
  }

  onSubmitIssueEstTemp(formData: IFileEstTemp): void {
    this.onSubmitGeneric(formData, ServiceEnum.IssueEstTemp)
  }


  delGenericTemp(delRows: IBaseEstTemp[], estTempClass: ServiceEnum): void {
    delRows.forEach(row => {
      let rowSubmit = convertIBaseEstToSubmit(row)
      this.serviceGetter(estTempClass).delete(rowSubmit.id)
    })
  }

  onSubmitGeneric(formData: GenericTemp, estTempClass: ServiceEnum): void {
    let formDataSubmit = convertIBaseEstToSubmit(formData)
    if (formDataSubmit.id == 0 || undefined
    ) {
      let cmb$ = this.addConditionLawFirm(formData.conditions,
        formData.law_firm_template)

      cmb$.pipe(mergeMap(x => {
        formDataSubmit.conditions = x[0].id
        formDataSubmit.law_firm_template = x[1].id
        //@ts-ignore
        return this.serviceGetter(estTempClass).add(formDataSubmit)
      })).subscribe()

    } else {
      let cmb$ = this.updateConditionLawFirm(formData.conditions,
        formData.law_firm_template)
      cmb$.pipe(mergeMap(x => {
        formDataSubmit.conditions = x[0].id
        formDataSubmit.law_firm_template = x[1].id
        //@ts-ignore
        return this.serviceGetter(estTempClass).update(formDataSubmit)
      })).subscribe(y => console.log(y))
    }
  }

  delFileEstTemp(delRows: IFileEstTemp[]): void {
    this.delGenericTemp(delRows, ServiceEnum.FileEstTemp)
  }

  delPublEstTemp(delRows: IPublEstTemp[]): void {
    this.delGenericTemp(delRows, ServiceEnum.PublEstTemp)
  }

  delReqEstTemp(delRows: IPublEstTemp[]): void {
    this.delGenericTemp(delRows, ServiceEnum.RequestExamEstTemp)
  }

  delOAEstTemp(delRows: IOAEstTemp[]): void {
    this.delGenericTemp(delRows, ServiceEnum.OAEstTemp)
  }

  delUSOAEstTemp(delRows: IUSOAEstTemp[]): void {
    this.delGenericTemp(delRows, ServiceEnum.USOAEstTemp)
  }

  delAllowEstTemp(delRows: IAllowEstTemp[]): void {
    this.delGenericTemp(delRows, ServiceEnum.AllowEstTemp)
  }

  delIssueEstTemp(delRows: IIssueEstTemp[]): void {
    this.delGenericTemp(delRows, ServiceEnum.IssueEstTemp)
  }

  updateConditionLawFirm(conditions: IConditions, law_firm_template: ILawFirmEstTemp) {
    let condition$ = this.conditionSer.update(conditions)
    let lawFirmTemp$ = this.lawFirmTempSer.update(law_firm_template)
    return forkJoin([condition$, lawFirmTemp$])
  }

  addConditionLawFirm(conditions: IConditions, law_firm_template: ILawFirmEstTemp) {
    let condition$ = this.conditionSer.add(conditions)
    let lawFirmTemp$ = this.lawFirmTempSer.add(law_firm_template)
    return forkJoin([condition$, lawFirmTemp$])
  }

  serviceGetter(serviceEnum: ServiceEnum) {
    switch (serviceEnum) {
      case ServiceEnum.FileEstTemp:
        return this.filEstSer
      case ServiceEnum.PublEstTemp:
        return this.publEstSer
      case ServiceEnum.OAEstTemp:
        return this.oaEstSer
      case ServiceEnum.USOAEstTemp:
        return this.usoaEstSer
      case ServiceEnum.AllowEstTemp:
        return this.allowEstSer
      case ServiceEnum.IssueEstTemp:
        return this.issueEstSer
      case ServiceEnum.RequestExamEstTemp:
        return this.reqEstSer
    }
  }

  private static formatLanguages(languages: Language[]): Language[] {
    let new_languages = languages
    languages.push({name: 'N/A', id: 0})
    return this.nameSort(new_languages)
  }

  private static formatComplexConditions(complexConditions: IComplexConditions[]): IComplexConditions[] {
    let newComplexConditions = complexConditions
    newComplexConditions.push({name: 'N/A', id: 0})
    return this.nameSort(newComplexConditions)
  }

  private static formatComplexTimeConditions(complexTimeConditions: IComplexTimeConditions[]): IComplexTimeConditions[] {
    let newComplexTimeConditions = complexTimeConditions
    newComplexTimeConditions.push({name: 'N/A', id: 0})
    return this.nameSort(newComplexTimeConditions)
  }

  private static formatDocFormats(docFormats: IDocFormat[]): IDocFormat[] {
    return this.nameSort(docFormats)
  }

  private static nameSort<T extends NamedWise[]>(genNamedArr: T) {
    return genNamedArr.sort((a, b) => {
      let objA = a.name.toUpperCase()
      let objB = b.name.toUpperCase()
      if (objA < objB) {
        return -1;
      }
      if (objA > objB) {
        return 1;
      }
      return 0;
    })
  }

  private static formatCountries(countries: Country[]): Country[] {
    return countries.sort((a, b) => {
      let objA = a.country.toUpperCase()
      let objB = b.country.toUpperCase()
      if (objA < objB) {
        return -1;
      }
      if (objA > objB) {
        return 1;
      }
      return 0;
    })
  }

  private static formatEntitySizes(entitySizes: EntitySize[]): EntitySize[] {
    let newEntitySizes = entitySizes
    newEntitySizes.push({entity_size: 'N/A', id: 0, description: 'N/A', default_bool: false, country: 0})
    return newEntitySizes.sort((a, b) => {
      let objA = a.entity_size.toUpperCase()
      let objB = b.entity_size.toUpperCase()
      if (objA < objB) {
        return -1;
      }
      if (objA > objB) {
        return 1;
      }
      return 0;
    })
  }
}
