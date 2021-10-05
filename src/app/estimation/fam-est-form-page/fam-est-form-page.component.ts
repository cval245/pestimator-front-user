import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {ApplType} from 'src/app/characteristics/_models/applType.model';
import {Country} from 'src/app/characteristics/_models/Country.model';
import {EntitySize} from 'src/app/characteristics/_models/entitySize.model';
import {ApplTypeService} from 'src/app/characteristics/_services/appl-type.service';
import {CountryService} from 'src/app/characteristics/_services/country.service';
import {EntitySizeService} from 'src/app/characteristics/_services/entity-size.service';
import {FamEstForm, FamEstFormFull} from '../_models/FamEstForm.model';
import {FamEstFormService} from '../_services/fam-est-form.service';
import {Router} from '@angular/router';
import {FamEstConfirmComponent} from "../fam-est-confirm/fam-est-confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {map, orderBy} from "lodash";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-fam-est-form-page',
  templateUrl: './fam-est-form-page.component.html',
  styleUrls: ['./fam-est-form-page.component.scss']
})
export class FamEstFormPageComponent implements OnInit, OnDestroy {

  public applTypes: ApplType[] = [new ApplType(0, '', '')];
  private applTypes$: Observable<ApplType[]>;
  private applTypesSub: Subscription;

  public countries: Country[];
  private countries$: Observable<Country[]>;
  private countriesSub: Subscription;

  public pct_countries: Country[];

  public entitySizes: EntitySize[] = [new EntitySize(0,'','')];
  private entitySizes$: Observable<EntitySize[]>;
  private entitySizesSub: Subscription;
  private famformData: FamEstForm = new FamEstForm('',
    '',0,'',0,0,
    0,0,0,0,0,0,
    false,0,'', false, 0);
  public error_notification: string = '';
  public error_display_bool: boolean = false;

  constructor(
    private famEstFormSer: FamEstFormService,
    private countrySer: CountryService,
    private applTypeSer: ApplTypeService,
    private entitySizeSer: EntitySizeService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.applTypes = [new ApplType(0, '', '')];
    this.applTypes$ = applTypeSer.entities$;
    this.applTypesSub = new Subscription();
    this.countries = [new Country(0, '', '', false, false, '', '')];
    this.countries$ = countrySer.entities$;
    this.countriesSub = new Subscription();
    this.pct_countries = [new Country(0, '', '', false, false, '', '')];
    this.entitySizes = [new EntitySize(0, '','')];
    this.entitySizes$ = entitySizeSer.entities$;
    this.entitySizesSub = new Subscription();
  }

  ngOnInit(): void {
    this.countriesSub = this.getCountries().subscribe(x => {

      this.countries = map(orderBy(x, ['long_name'], ['asc']),
        (y, i) => {
        if (i <= x.length / 2) {
          return {...y, 'col': 1}
        } else {
          return {...y, 'col': 2}
        }
      })
      this.pct_countries = this.countries.filter(y => y.pct_analysis_bool)
    });
    this.applTypesSub = this.getApplTypes().subscribe(x => this.applTypes = x);
    this.entitySizesSub = this.getEntitySize().subscribe(x => this.entitySizes = x);
  }

    ngOnDestroy(): void {
        this.countriesSub.unsubscribe()
        this.applTypesSub.unsubscribe()
        this.entitySizesSub.unsubscribe()
    }

    add(famEstForm: FamEstForm): Observable<FamEstForm>{
        return this.famEstFormSer.add(famEstForm);
    }

    delete(famEstForm: FamEstForm){
        this.famEstFormSer.delete(famEstForm)
    }

    getFamEstForms(){
        return this.famEstFormSer.getAll();
    }

    getCountries(){
        return this.countrySer.getAll();
    }

    getApplTypes(){
        return this.applTypeSer.getAll();
    }
    getEntitySize(){
        return this.entitySizeSer.getAll();
    }

    update(famEstForm: FamEstForm){
        this.famEstFormSer.update(famEstForm)
    }

    onSubmit() {
      const datetime = JSON.stringify(this.famformData.init_appl_filing_date)
      const dateParts = datetime.split("T")
      const dateSplit = dateParts[0].split('\"')
      this.famformData.init_appl_filing_date = dateSplit[1]
      this.add(this.famformData).pipe(catchError(err => {
        console.log('err.error', err.error)
        console.log('err.error.error', err.error.error)
        this.error_notification = err.error.error.detail
        this.error_display_bool = true
        return of(
          new FamEstForm('',
          '',0,'',0,0,
          0,0,0,0,0,0,
          false,0,'', false, 0)
        )
      })).subscribe(x => {
        if(x.id !=0){
          this.error_display_bool = false
          this.router.navigate(['estimations/' + x.id])
        }
      })
    }

    verifySubmission(formData: FamEstForm){
      this.famformData = formData
      console.log('this.famformData', this.famformData)
      let fullFormData = formData
      let totalFormData: FamEstFormFull;
      let entity_size = this.entitySizes.find(x => x.id == fullFormData.entity_size)!
      let init_appl_country= this.countries.find(x => x.id == fullFormData.init_appl_country)!
      let init_appl_type = this.applTypes.find(x => x.id == fullFormData.init_appl_type)!
      let countries = fullFormData.countries.map((x: number) => {
        return this.countries.find(y => y.id == x)
      })
      let meth_country= this.countries.find(x => x.id == fullFormData.meth_country)!
      totalFormData = new FamEstFormFull(
        fullFormData.family_name,
        fullFormData.family_no,
        entity_size,
        fullFormData.init_appl_filing_date,
        init_appl_country,
        init_appl_type,
        fullFormData.init_appl_claims,
        fullFormData.init_appl_drawings,
        fullFormData.init_appl_indep_claims,
        fullFormData.init_appl_pages_desc,
        fullFormData.init_appl_pages_claims,
        fullFormData.init_appl_pages_drawings,
        fullFormData.method,
        meth_country,
        countries,
        fullFormData.ep_method,
        fullFormData.id,
      );
      console.log('totalFormData', totalFormData)

       let dialogRef = this.dialog.open(FamEstConfirmComponent, {
         width: '500px',
         data: totalFormData})

      dialogRef.afterClosed().subscribe(result => {
        if(result.event == 'save') {
          this.onSubmit()
        }
      })
    }
}
