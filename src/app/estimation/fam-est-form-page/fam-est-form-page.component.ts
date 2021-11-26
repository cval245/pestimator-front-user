import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
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
import {catchError} from "rxjs/operators";
import {CustomDetailsFormComponent} from "../custom-details-form/custom-details-form.component";
import {APPL_VERSIONS} from "../enums";
import {Store} from "@ngrx/store";
import {CustomApplDetails} from "../_models/CustomApplDetails.model";
import {createCustomApplDetails} from "../../store/actions/customDetails.action";
import {CustomApplOptions} from "../_models/CustomApplOptions.model";
import {CustomOptionsFormComponent} from "../custom-options-form/custom-options-form.component";
import {DocFormatService} from "../../characteristics/_services/doc-format.service";
import {IDocFormat} from "../../characteristics/_models/DocFormat.model";

@Component({
  selector: 'app-fam-est-form-page',
  templateUrl: './fam-est-form-page.component.html',
  styleUrls: ['./fam-est-form-page.component.scss']
})
export class FamEstFormPageComponent implements OnInit, OnDestroy {

  public applTypes: ApplType[] = [new ApplType()];
  private applTypes$: Observable<ApplType[]> = this.applTypeSer.entities$;
  private applTypesSub: Subscription = new Subscription();

  public countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  private countries$: Observable<Country[]> = this.countrySer.entities$;
  private countriesSub: Subscription = new Subscription();

  public pct_ro_countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  public pct_accept_countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  public ep_countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];
  public paris_basic_countries: CountryDetailsAdded[] = [new CountryDetailsAdded()];


  public entitySizes: EntitySize[] = [new EntitySize()];
  private entitySizes$: Observable<EntitySize[]> = this.entitySizeSer.entities$;
  private entitySizesSub: Subscription = new Subscription();
  private famformData: FamEstForm = new FamEstForm()
  public error_notification: string = '';
  public error_display_bool: boolean = false;
  public allCustomDetails: [{country_id: number, applVersion: APPL_VERSIONS, customDetails: CustomApplDetails, customOptions: CustomApplOptions}] = [{country_id:0, applVersion:APPL_VERSIONS.PCT_APPL, customDetails:new CustomApplDetails(), customOptions: new CustomApplOptions()}];
  public customOpt: CustomApplOptions = new CustomApplOptions();
  public docFormats: IDocFormat[] = new Array<IDocFormat>();
  private docFormatSub: Subscription = new Subscription();

  constructor(
    private famEstFormSer: FamEstFormService,
    private countrySer: CountryService,
    private applTypeSer: ApplTypeService,
    private entitySizeSer: EntitySizeService,
    private docFormatSer: DocFormatService,
    private router: Router,
    public dialog: MatDialog,
    private store: Store<{customDetails:any}>,
  ) { }

  ngOnInit(): void {
    this.countriesSub = this.countrySer.getAllUnlessAlreadyLoaded().subscribe(x => {

      this.countries = map(orderBy(x, ['long_name'], ['asc']),
        (y, i) => {
        // y.available_entity_sizes = map(y.available_entity_sizes, z => this.entitySizes.find(w => w.id == z))
          if (i <= x.length / 2) {
            return {...y, 'col': 1,
              'available_entity_sizes': map(y.available_entity_sizes, z => this.entitySizes.find(w => w.id == z)!),
              'available_doc_formats': map(y.available_doc_formats, z => this.docFormats.find(w => w.id ==z)!)
            }
          } else {
            return {...y, 'col': 2,
              'available_entity_sizes': map(y.available_entity_sizes, z => this.entitySizes.find(w => w.id == z)!),
              'available_doc_formats': map(y.available_doc_formats, z => this.docFormats.find(w => w.id ==z)!)
            }
          }
        })
      this.pct_ro_countries = this.countries.filter(y => y.pct_ro_bool)
      this.pct_accept_countries = this.countries.filter(y => y.pct_accept_bool)
      this.ep_countries = this.countries.filter(y => y.ep_bool)
      this.paris_basic_countries = this.countries.filter(y => y.country != 'IB')
      // this.direct_file_countries = this.countries.filter(y => y)
    });
    this.docFormatSub = this.docFormatSer.getAllUnlessAlreadyLoaded().subscribe(x => {
      this.docFormats = x
    })
    this.applTypesSub = this.applTypeSer.getAllUnlessAlreadyLoaded().subscribe(x => {
      this.applTypes = x
    });
    this.entitySizesSub = this.entitySizeSer.getAllUnlessAlreadyLoaded().subscribe(x => this.entitySizes = x);
    this.store.select('customDetails').subscribe(x =>{
      this.allCustomDetails = x
      })
  }

    ngOnDestroy(): void {
        this.countriesSub.unsubscribe()
        this.applTypesSub.unsubscribe()
        this.entitySizesSub.unsubscribe()
      this.docFormatSub.unsubscribe()
    }

    add(famEstForm: FamEstFormSubmit): Observable<FamEstFormSubmit>{
        return this.famEstFormSer.add(famEstForm);
    }

    delete(famEstForm: FamEstFormSubmit){
        this.famEstFormSer.delete(famEstForm)
    }

    update(famEstForm: FamEstFormSubmit){
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
        if(x.id !=0){
          this.error_display_bool = false
          this.router.navigate(['estimation/estimations/' + x.unique_display_no])
        }
      })
    }

    verifySubmission(formData: FamEstForm) {
      this.famformData = formData


       let dialogRef = this.dialog.open(FamEstConfirmComponent, {
         width: '500px',
         data: formData})

      dialogRef.afterClosed().subscribe(result => {
        if (result){
          if(result.event == 'save') {
            this.onSubmit()
          }
        }
      })
    }

  editCustomApplDetails($event: any) {
    let country_id = $event.country
    let appl_version = $event.appl_version
    // create data location in store (if needed)
    // save data location
    // let customDetailsData = undefined
    // if(this.allCustomDetails.length>0) {
      let customDetailsData = find(this.allCustomDetails, x => {
        return x.country_id == country_id && x.applVersion == appl_version
      })

    let customDetails=undefined
    let customOptions=undefined
    if (customDetailsData !== undefined){
        customDetails = customDetailsData!.customDetails
        customOptions = customDetailsData!.customOptions
      }
    let dialogRef = this.dialog.open(CustomDetailsFormComponent,
      {data: {customDetails: customDetails,
          customOptions: customOptions,
          entitySizes: this.entitySizes}})
      dialogRef.afterClosed().subscribe((result: {data:
          {custom_appl_details: CustomApplDetails,
          custom_appl_options: CustomApplOptions}}) => {
        if (result){
          this.store.dispatch(createCustomApplDetails({
            applVersion: appl_version,
            country_id: country_id,
            customDetails: result.data.custom_appl_details,
            customOptions: result.data.custom_appl_options,
          }))
        }
      })
  }

  editCustomApplOptions($event: any) {
    let dialogRef = this.dialog.open(CustomOptionsFormComponent,
      {data: this.customOpt})
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
