import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {clone, map} from 'lodash';
import {forkJoin, Subject} from 'rxjs';
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
}

interface CountryWise {
  id: number,
  country: any;
}

interface FeeCategoryWise {
  id: number,
  fee_category: any;
}


interface ApplTypeWise {
  id: number,
  appl_type: any;
}

interface EntitySizeWise {
  id: number,
  condition_entity_size: any;
}

interface DocFormatWise {
  id: number,
  doc_format: any;
}

interface OverDocFormatWise {
  id: number,
  conditions: DocFormatWise;
}

interface OverEntitySizeWise {
  id: number,
  conditions: EntitySizeWise;
}

interface LanguageWise {
  id: number,
  language: any;
}

interface OverLanguageWise {
  id: number,
  conditions: LanguageWise
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
  private country_us_id: number = 0;
  public complexTimeConditions = new Array<IComplexTimeConditions>();
  public currencies: Currency[] = new Array<Currency>();
  public languages: Language[] = new Array<Language>();
  public filteredLanguages: Language[] = new Array<Language>();
  public currencies_list: string[] = new Array<string>();
  public docFormats: IDocFormat[] = new Array<IDocFormat>();
  public overLayOpen: boolean = true;
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
    private _viewContainerRef: ViewContainerRef,
    private overlay: Overlay,
  ) {

    this.docFormatSer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.docFormats = x.sort((a, b) => {
          let countryA = a.name.toUpperCase()
          let countryB = b.name.toUpperCase()
          if (countryA < countryB) {
            return -1;
          }
          if (countryA > countryB) {
            return 1;
          }
          return 0;
        })
      })
    this.languageSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.languages = x
        this.languages.push({name: 'N/A', id: 0})
      })
    this.feeCatSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.feeCategories = x
      })
    this.currencySer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.currencies = x
        this.currencies_list = map(x, y => y.currency_name).sort()
      })
    this.countrySer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.country_us_id = x.find(y => y.country == 'US')?.id || 0
        this.countries = x.sort((a, b) => {
          let countryA = a.country.toUpperCase()
          let countryB = b.country.toUpperCase()
          if (countryA < countryB) {
            return -1;
          }
          if (countryA > countryB) {
            return 1;
          }
          return 0;
        })
      })

    this.entitySizeSer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.entitySizes = x
        this.entitySizes.push({entity_size: 'N/A', id: 0, description: 'N/A', default_bool: false, country: 0})
      })

    this.applTypeSer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.applTypes = x)

    this.conditionSer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {

        // this.conditions = cloneDeep(x)
        // this.conditions = x.slice(0)
        this.conditions = x
        this.conditions = clone(this.conditions)
        this.setFilters(this.country.id)
      })

    this.complexConditionSer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.complexConditions = x
        this.complexConditions.push({name: 'N/A', id: 0})
      })

    this.complexTimeConditionSer.getAllUnlessAlreadyLoaded()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.complexTimeConditions = x
        this.complexTimeConditions.push({name: 'N/A', id: 0})
      })

    this.lawFirmTempSer.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.lawFirmTemp = x)

    this.countryControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.country = this.countries.find(y => y.id == x)!
        this.country_us = false
        if (x == this.country_us_id) {
          this.country_us = true
        }
        this.setFilters(x)
        // this.filteredLanguages = map(this.country.available_languages, y => this.languages.find(z => z.id == y.language))
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
    this.reqEstSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.reqEstTemp = this.replaceFkWithObject(x)
      })
    this.oaEstSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.oaEstTemp = this.replaceFkWithObject(x)
      })
    this.usoaEstSer.filteredEntities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.usoaEstTemp = this.replaceFkWithObjectUSOA(x)
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

  replaceFkWithObject(data: GenericTemp[]) {
    return this.languageSet(this.complexTimeConditionsSet(this.complexConditionsSet(this.docFormatSet(this.entitySizeSet(
      this.lawFirmTempSet(this.conditionsSet(
        this.applTypeSet(this.countrySet(this.feeCategorySet(
          data))))))))))
  }

  replaceFkWithObjectUSOA(data: IUSOAEstTemp[]) {
    return this.languageSet(this.complexTimeConditionsSet(this.complexConditionsSet(this.docFormatSet(this.entitySizeSet(
      this.lawFirmTempSet(this.conditionsSet(
        this.applTypeSet(this.countrySet(this.feeCategorySet(
          data))))))))))
  }

  feeCategorySet<TFeeCategoryWise extends FeeCategoryWise>(arg: TFeeCategoryWise[]): TFeeCategoryWise[] {
    return map<TFeeCategoryWise, TFeeCategoryWise>(arg, (x: TFeeCategoryWise) => {
      let d = this.feeCategories.find(y => y.id == x.fee_category);
      return {...x, 'fee_category': d}
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

  entitySizeSet<TEntitySizeWise extends OverEntitySizeWise>(arg: TEntitySizeWise[]): TEntitySizeWise[] {
    return map<TEntitySizeWise, TEntitySizeWise>(arg, (x: TEntitySizeWise) => {
      let d = this.entitySizes.find(y => y.id == x.conditions.condition_entity_size);
      let conditions = {...x.conditions, 'condition_entity_size': d}
      return {...x, conditions}
    })
  }

  languageSet<TLanguageWise extends OverLanguageWise>(arg: TLanguageWise[]): TLanguageWise[] {
    return map<TLanguageWise, TLanguageWise>(arg, (x: TLanguageWise) => {
      let d = this.languages.find(y => y.id == x.conditions.language);
      let conditions = {...x.conditions, 'language': d}
      return {...x, conditions}
    })
  }


  docFormatSet<TDocFormatWise extends OverDocFormatWise>(arg: TDocFormatWise[]): TDocFormatWise[] {
    return map<TDocFormatWise, TDocFormatWise>(arg, (x: TDocFormatWise) => {
      let d = this.docFormats.find(y => y.id == x.conditions.doc_format);
      let conditions = {...x.conditions, 'doc_format': d}
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
    if (formData.id == 0 || undefined) {
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

  delFileEstTemp(delRows: IFileEstTemp[]): void {
    for (let row of delRows) {
      this.filEstSer.delete(row)
    }
  }

  onSubmitPublEstTemp(formData: IPublEstTemp): void {
    if (formData.id == 0 || undefined) {
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

  delPublEstTemp(delRows: IPublEstTemp[]): void {
    for (let row of delRows) {
      this.publEstSer.delete(row)
    }
  }

  onSubmitReqEstTemp(formData: IRequestExamEstTemp): void {
    if (formData.id == 0 || undefined) {
      let cmb$ = this.addConditionLawFirm(formData.conditions,
        formData.law_firm_template)

      cmb$.pipe(mergeMap(x => {
        formData.conditions = x[0].id
        formData.law_firm_template = x[1].id
        return this.reqEstSer.add(formData)
      })).subscribe()

    } else {
      let cmb$ = this.updateConditionLawFirm(formData.conditions,
        formData.law_firm_template)
      cmb$.pipe(mergeMap(x => {
        formData.conditions = x[0].id
        formData.law_firm_template = x[1].id
        return this.reqEstSer.update(formData)
      })).subscribe()
    }
  }

  delReqEstTemp(delRows: IPublEstTemp[]): void {
    for (let row of delRows) {
      this.reqEstSer.delete(row)
    }
  }


  onSubmitOAEstTemp(formData: IOAEstTemp): void {
    if (formData.id == 0 || undefined) {
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

  delOAEstTemp(delRows: IOAEstTemp[]): void {
    for (let row of delRows) {
      this.oaEstSer.delete(row)
    }
  }

  // for us oa estimates because extra column
  onSubmitUSOAEstTemp(formData: IUSOAEstTemp): void {
    if (formData.id == 0 || undefined) {
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

  delUSOAEstTemp(delRows: IUSOAEstTemp[]): void {
    for (let row of delRows) {
      this.usoaEstSer.delete(row)
    }
  }


  onSubmitAllowEstTemp(formData: IAllowEstTemp): void {

    if (formData.id == 0 || undefined) {
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

  delAllowEstTemp(delRows: IAllowEstTemp[]): void {
    for (let row of delRows) {
      this.allowEstSer.delete(row)
    }
  }

  onSubmitIssueEstTemp(formData: IIssueEstTemp): void {
    if (formData.id == 0 || undefined) {
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

  delIssueEstTemp(delRows: IIssueEstTemp[]): void {
    for (let row of delRows) {
      this.issueEstSer.delete(row)
    }
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
}
