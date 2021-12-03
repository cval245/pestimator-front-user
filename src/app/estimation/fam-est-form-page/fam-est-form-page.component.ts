import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {ApplType} from 'src/app/characteristics/_models/applType.model';
import {Country, CountryDetailsAdded} from 'src/app/characteristics/_models/Country.model';
import {EntitySize} from 'src/app/characteristics/_models/entitySize.model';
import {ApplTypeService} from 'src/app/characteristics/_services/appl-type.service';
import {CountryService} from 'src/app/characteristics/_services/country.service';
import {EntitySizeService} from 'src/app/characteristics/_services/entity-size.service';
import {convertToFamEstFormSubmit, FamEstForm, FamEstFormSubmit} from '../_models/FamEstForm.model';
import {FamEstFormService} from '../_services/fam-est-form.service';
import {Router} from '@angular/router';
import {FamEstConfirmComponent} from "../fam-est-confirm/fam-est-confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {find, map, orderBy} from "lodash";
import {catchError, takeUntil} from "rxjs/operators";
import {CustomDetailsFormComponent} from "../custom-details-form/custom-details-form.component";
import {APPL_VERSIONS} from "../enums";
import {Store} from "@ngrx/store";
import {CustomApplDetails} from "../_models/CustomApplDetails.model";
import {createCustomApplDetails} from "../../store/actions/customDetails.action";
import {CustomApplOptions} from "../_models/CustomApplOptions.model";
import {CustomOptionsFormComponent} from "../custom-options-form/custom-options-form.component";
import {DocFormatService} from "../../characteristics/_services/doc-format.service";
import {IDocFormat} from "../../characteristics/_models/DocFormat.model";
import {DocFormatCountryService} from "../../characteristics/_services/doc-format-country.service";
import {IDocFormatCountry} from "../../characteristics/_models/DocFormatCountry.model";
import {Language} from "../../characteristics/_models/Language.model";
import {LanguageService} from "../../characteristics/_services/language.service";

@Component({
  selector: 'app-fam-est-form-page',
  templateUrl: './fam-est-form-page.component.html',
  styleUrls: ['./fam-est-form-page.component.scss']
})
export class FamEstFormPageComponent implements OnInit, OnDestroy {

  private destroyed = new Subject<void>();
  public applTypes: ApplType[] = [new ApplType()];
  public countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  public languages: Language[] = new Array<Language>()
  public pct_ro_countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  public pct_accept_countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  public ep_countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  public paris_basic_countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  public entitySizes: EntitySize[] = [new EntitySize()];
  private famformData: FamEstForm = new FamEstForm()
  public error_notification: string = '';
  public error_display_bool: boolean = false;
  public allCustomDetails: [{
    country: Country, applVersion: APPL_VERSIONS,
    appl_type: ApplType, customDetails: CustomApplDetails, customOptions: CustomApplOptions
  }] = [{
    country: new Country,
    applVersion: APPL_VERSIONS.PCT_APPL,
    customDetails: new CustomApplDetails(),
    customOptions: new CustomApplOptions(),
    appl_type: new ApplType()
  }];
  public customOpt: CustomApplOptions = new CustomApplOptions();
  public docFormats: IDocFormat[] = new Array<IDocFormat>();
  public docFormatCountries: IDocFormatCountry[] = new Array<IDocFormatCountry>()

  constructor(
    private famEstFormSer: FamEstFormService,
    private countrySer: CountryService,
    private applTypeSer: ApplTypeService,
    private entitySizeSer: EntitySizeService,
    private docFormatSer: DocFormatService,
    private docFormatCountrySer: DocFormatCountryService,
    private langSer: LanguageService,
    private router: Router,
    public dialog: MatDialog,
    private store: Store<{ customDetails: any }>,
  ) {
  }

  ngOnInit(): void {

    combineLatest([
      this.countrySer.getAllUnlessAlreadyLoaded(),
      this.entitySizeSer.getAllUnlessAlreadyLoaded()])
      .pipe(takeUntil(this.destroyed)).subscribe(([countries, entitySizes]) => {
      this.entitySizes = entitySizes
      this.countries = map(orderBy(countries, ['long_name'], ['asc']),
        (y, i) => {
          if (i <= countries.length / 2) {
            return {
              ...y, 'col': 1,
              // 'available_entity_sizes': map(y.available_entity_sizes, z => this.entitySizes.find(w => w.id == z)!),
            }
          } else {
            return {
              ...y, 'col': 2,
              // 'available_entity_sizes': map(y.available_entity_sizes, z => this.entitySizes.find(w => w.id == z)!),

            }
          }
        })
      this.pct_ro_countries = this.countries.filter(y => y.pct_ro_bool)
      this.pct_accept_countries = this.countries.filter(y => y.pct_accept_bool)
      this.ep_countries = this.countries.filter(y => y.ep_bool)
      this.paris_basic_countries = this.countries.filter(y => y.country != 'IB')
    });
    // this.docFormatSub =
    this.docFormatSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.destroyed)).subscribe(x => {
      this.docFormats = x
    })
    this.docFormatCountrySer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.destroyed)).subscribe(x => {
      this.docFormatCountries = x
    })
    this.langSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.destroyed)).subscribe(x => {
      this.languages = x
    })
    this.applTypeSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.destroyed)).subscribe(x => {
      this.applTypes = x
    });
    this.store.select('customDetails').subscribe(x => {
      this.allCustomDetails = x
    })
  }

  ngOnDestroy(): void {
    this.destroyed.next()
    this.destroyed.complete()
  }

  add(famEstForm: FamEstFormSubmit): Observable<FamEstFormSubmit> {
    return this.famEstFormSer.add(famEstForm);
  }

  delete(famEstForm: FamEstFormSubmit) {
    this.famEstFormSer.delete(famEstForm)
  }

  update(famEstForm: FamEstFormSubmit) {
    this.famEstFormSer.update(famEstForm)
  }

  onSubmit() {

    let submitFamformData: FamEstFormSubmit = convertToFamEstFormSubmit(this.famformData)

    this.add(submitFamformData).pipe(catchError(err => {
      this.error_notification = err.error.error.detail
      this.error_display_bool = true
      return of(
        new FamEstForm()
      )
    })).subscribe(x => {
      if (x.id != 0) {
        this.error_display_bool = false
        this.router.navigate(['estimation/estimations/' + x.unique_display_no])
      }
    })
  }

  verifySubmission(formData: FamEstForm) {
    this.famformData = formData


    let dialogRef = this.dialog.open(FamEstConfirmComponent, {
      width: '500px',
      data: formData
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event == 'save') {
          this.onSubmit()
        }
      }
    })
  }

  editCustomApplDetails($event: any) {
    let country = $event.country
    let appl_version = $event.appl_version
    let appl_type = $event.appl_type

    let customDetailsData = find(this.allCustomDetails, x => {
      return x.country == country && x.applVersion == appl_version
    })

    let customDetails = new CustomApplDetails()
    let customOptions = new CustomApplOptions()
    if (customDetailsData !== undefined) {
      customDetails = customDetailsData!.customDetails
      customOptions = customDetailsData!.customOptions
    }
    let dialogRef = this.dialog.open(CustomDetailsFormComponent,
      {
        data: {
          customDetails: customDetails,
          customOptions: customOptions,
          entitySizes: this.entitySizes,
          country: country,
          appl_type: appl_type,
          doc_formats: this.docFormats,
          languages: this.languages,
        }
      })
    dialogRef.afterClosed().subscribe((result: {
      data:
        {
          custom_appl_details: CustomApplDetails,
          custom_appl_options: CustomApplOptions
        }
    }) => {
      if (result) {
        this.store.dispatch(createCustomApplDetails({
          applVersion: appl_version,
          country: country,
          appl_type: appl_type,
          customDetails: result.data.custom_appl_details,
          customOptions: result.data.custom_appl_options,
        }))
      }
    })
  }

  editCustomApplOptions(data: { country: Country, appl_version: APPL_VERSIONS, appl_type: ApplType }) {
    let dialogRef = this.dialog.open(CustomOptionsFormComponent,
      {
        data: {
          customOptions: this.customOpt, country: data.country,
          appl_type: data.appl_type, doc_formats: this.docFormats
        }
      })
    dialogRef.afterClosed().subscribe((result: {
      data:
        CustomApplOptions
    }) => {
      if (result) {
        this.customOpt = result.data
      }
    })
  }
}
