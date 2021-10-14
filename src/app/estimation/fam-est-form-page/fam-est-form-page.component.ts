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

  public applTypes: ApplType[] = [new ApplType(0, '', '', [0])];
  private applTypes$: Observable<ApplType[]>;
  private applTypesSub: Subscription;

  public countries: Country[];
  private countries$: Observable<Country[]>;
  private countriesSub: Subscription;

  public pct_ro_countries: Country[];
  public pct_accept_countries: Country[];
  public ep_countries: Country[];
  public paris_basic_countries: Country[];


  public entitySizes: EntitySize[] = [new EntitySize(0, '', '')];
  private entitySizes$: Observable<EntitySize[]>;
  private entitySizesSub: Subscription;
  private famformData: FamEstForm = new FamEstForm('',
    '', 0, '', 0, 0,
    0, 0, 0, 0, 0, 0,
    false, 0, 0, '', false, 0, 0, 0, 0);
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
    this.applTypes = [new ApplType(0, '', '', [0])];
    this.applTypes$ = applTypeSer.entities$;
    this.applTypesSub = new Subscription();
    this.countries = [new Country(0, '', '', false, false, false, '', '', [0], [0], [0])];
    this.countries$ = countrySer.entities$;
    this.countriesSub = new Subscription();
    this.pct_ro_countries = [new Country(0, '', '', false, false, false, '', '', [0], [0], [0])];
    this.pct_accept_countries = [new Country(0, '', '', false, false, false, '', '', [0], [0], [0])];
    this.ep_countries = [new Country(0, '', '', false, false, false, '', '', [0], [0], [0])];
    this.paris_basic_countries = [new Country(0, '', '', false, false, false, '', '', [0], [0], [0])];
    // this.direct_file_countries = [new Country(0, '', '', false, false, false, '', '', [0], [0], [0])];
    this.entitySizes = [new EntitySize(0, '', '')];
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
      this.pct_ro_countries = this.countries.filter(y => y.pct_ro_bool)
      this.pct_accept_countries = this.countries.filter(y => y.pct_accept_bool)
      this.ep_countries = this.countries.filter(y => y.ep_bool)
      this.paris_basic_countries = this.countries.filter(y => y.country != 'IB')
      // this.direct_file_countries = this.countries.filter(y => y)
    });
    this.applTypesSub = this.getApplTypes().subscribe(x => {
      this.applTypes = x
    });
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
        this.error_notification = err.error.error.detail
        this.error_display_bool = true
        return of(
          new FamEstForm('',
            '', 0, '', 0, 0,
            0, 0, 0, 0, 0, 0,
            false, 0, 0, '', false, 0, 0, 0, 0)
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
      let fullFormData = formData
      let totalFormData: FamEstFormFull;
      let entity_size = this.entitySizes.find(x => x.id == fullFormData.entity_size)!
      let init_appl_country = this.countries.find(x => x.id == fullFormData.init_appl_country)!
      let init_appl_type = this.applTypes.find(x => x.id == fullFormData.init_appl_type)!

      let pct_country = this.countries.find(x => x.id == fullFormData.pct_country)!
      let isa_country = this.countries.find(x => x.id == fullFormData.isa_country)!
      let pct_countries = fullFormData.pct_countries.map((x: number) => {
        return this.countries.find(y => y.id == x)
      })
      let ep_countries = fullFormData.ep_countries.map((x: number) => {
        return this.countries.find(y => y.id == x)
      })
      let paris_countries = fullFormData.paris_countries.map((x: number) => {
        return this.countries.find(y => y.id == x)
      })
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
        fullFormData.pct_method,
        pct_country,
        isa_country,
        pct_countries,
        fullFormData.ep_method,
        ep_countries,
        paris_countries,
        fullFormData.id,
      );

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
