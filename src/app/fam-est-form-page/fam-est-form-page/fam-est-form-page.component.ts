import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {ApplType} from 'src/app/_models/applType.model';
import {Country, CountryDetailsAdded} from 'src/app/_models/Country.model';
import {EntitySize} from 'src/app/_models/entitySize.model';
import {CountryService} from 'src/app/_services/country.service';
import {EntitySizeService} from 'src/app/_services/entity-size.service';
import {convertToFamEstFormSubmit, FamEstForm, FamEstFormSubmit} from '../../_models/FamEstForm.model';
import {FamEstFormService} from '../../_services/fam-est-form.service';
import {Router} from '@angular/router';
import {FamEstConfirmComponent} from "../../fam-est-form/fam-est-confirm/fam-est-confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {cloneDeep, find, isEqual, map, orderBy} from "lodash";
import {catchError, takeUntil} from "rxjs/operators";
import {APPL_VERSIONS} from "../../estimation/enums";
import {CustomApplDetails} from "../../_models/CustomApplDetails.model";
import {CustomApplOption} from "../../_models/CustomApplOptions.model";
import {DocFormatService} from "../../_services/doc-format.service";
import {IDocFormat} from "../../_models/DocFormat.model";
import {Language} from "../../_models/Language.model";
import {LanguageService} from "../../_services/language.service";
import {CustomOptionsFormComponent} from "../../fam-est-form/custom-options-form/custom-options-form.component";
import {CustomDetailsFormComponent} from "../../fam-est-form/custom-details-form/custom-details-form.component";
import {ApplTypeAllService} from "../../_services/appl-type-all.service";
import {ICustomDetail} from "../../fam-est-form/fam-est-form/fam-est-form.component";
import {FamilyService} from "../../_services/family.service";
import {FamEstService} from "../../_services/fam-est.service";

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
  public allCustomDetails: ICustomDetail[] = new Array<ICustomDetail>()
  public customOpt: CustomApplOption = new CustomApplOption();
  public docFormats: IDocFormat[] = new Array<IDocFormat>();

  constructor(
    private familySer: FamilyService,
    private famEstSer: FamEstService,
    private famEstFormSer: FamEstFormService,
    private countrySer: CountryService,
    private applTypeSer: ApplTypeAllService,
    private entitySizeSer: EntitySizeService,
    private docFormatSer: DocFormatService,
    private langSer: LanguageService,
    private router: Router,
    public dialog: MatDialog,
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
            }
          } else {
            return {
              ...y, 'col': 2,
            }
          }
        })
      this.pct_ro_countries = this.countries.filter(y => y.pct_ro_bool)
      this.pct_accept_countries = this.countries.filter(y => y.pct_accept_bool)
      this.ep_countries = this.countries.filter(y => y.ep_bool)
      this.paris_basic_countries = this.countries.filter(y => y.country != 'IB')
    });
    this.docFormatSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.destroyed)).subscribe(x => {
      this.docFormats = x
    })
    this.langSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.destroyed)).subscribe(x => {
      this.languages = x
    })
    this.applTypeSer.getAllUnlessAlreadyLoaded().pipe(takeUntil(this.destroyed)).subscribe(x => {
      this.applTypes = x
    });
    // this.store.select('customDetails').subscribe(x => {
    //   this.allCustomDetails = x
    // })
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
        this.familySer.setLoaded(false)
        this.famEstSer.setLoaded(false)
        this.router.navigate(['/estimations/' + x.unique_display_no])
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
    let country: Country = $event.country
    let appl_version: APPL_VERSIONS = $event.appl_version
    let appl_type: ApplType = $event.appl_type

    let customDetailsData = find(this.allCustomDetails, x => {
      return (isEqual(x.country, country)
        && isEqual(x.appl_version, appl_version)
        && isEqual(x.appl_type, appl_type))
    })
    let customDetails
    let customOptions
    if (customDetailsData) {
      customDetails = customDetailsData.customDetails
      customOptions = customDetailsData.customOptions
    } else {
      customDetails = new CustomApplDetails()
      customOptions = new CustomApplOption()

      let default_format_id = country.available_doc_formats.find(x => {
        return x.default && x.appl_type == appl_type.id
      })!.doc_format
      customOptions.doc_format = this.docFormats.find(x => {
        return x.id == default_format_id
      })!

      let defaultLanguage_id = country.available_languages.find(x => {
        return x.default && x.appl_type == appl_type.id
      })!.language
      customDetails.language = this.languages.find(x => {
        return x.id == defaultLanguage_id
      })!
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
          custom_appl_options: CustomApplOption
        }
    }) => {
      if (result) {
        let customDet = find(this.allCustomDetails, y => {
          return (y.appl_type.id == appl_type.id
            && y.appl_version == appl_version
            && y.country.id == country.id)
        })
        if (customDet) {
          customDet.customDetails = result.data.custom_appl_details
          customDet.customOptions = result.data.custom_appl_options
        } else {
          this.allCustomDetails.push({
              country: country,
              appl_type: appl_type,
              appl_version: appl_version,
              customDetails: result.data.custom_appl_details,
              customOptions: result.data.custom_appl_options
            }
          )
        }
        this.allCustomDetails = cloneDeep(this.allCustomDetails)
      }
    })
  }

  editCustomApplOptions(data: { country: Country, appl_version: APPL_VERSIONS, appl_type: ApplType }) {
    let dialogRef = this.dialog.open(CustomOptionsFormComponent,
      {
        data: {
          customOptions: this.customOpt,
          country: data.country,
          appl_type: data.appl_type,
          doc_formats: this.docFormats
        }
      })
    dialogRef.afterClosed().subscribe((result: {
      data:
        CustomApplOption
    }) => {
      if (result) {
        this.customOpt = result.data
      }
    })
  }
}
