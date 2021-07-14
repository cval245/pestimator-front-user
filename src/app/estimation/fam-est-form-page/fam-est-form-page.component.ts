import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApplType } from 'src/app/characteristics/_models/applType.model';
import { Country } from 'src/app/characteristics/_models/Country.model';
import { EntitySize } from 'src/app/characteristics/_models/entitySize.model';
import { ApplTypeService } from 'src/app/characteristics/_services/appl-type.service';
import { CountryService } from 'src/app/characteristics/_services/country.service';
import { EntitySizeService } from 'src/app/characteristics/_services/entity-size.service';
import { FamEstForm } from '../_models/FamEstForm.model';
import { FamEstFormService } from '../_services/fam-est-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fam-est-form-page',
  templateUrl: './fam-est-form-page.component.html',
  styleUrls: ['./fam-est-form-page.component.scss']
})
export class FamEstFormPageComponent implements OnInit {

    private loading$: Observable<boolean>;
    private famEstForms: FamEstForm[];
    private famEstForm$: Observable<FamEstForm[]>;
    private famEstFormSub: Subscription;

    public applTypes: ApplType[];
    private applTypes$: Observable<ApplType[]>;
    private applTypesSub: Subscription;

    public countries: Country[];
    private countries$: Observable<Country[]>;
    private countriesSub: Subscription;

    public entitySizes: EntitySize[];
    private entitySizes$: Observable<EntitySize[]>;
    private entitySizesSub: Subscription;

    constructor(
        private famEstFormSer: FamEstFormService,
        private countrySer: CountryService,
        private applTypeSer: ApplTypeService,
        private entitySizeSer: EntitySizeService,
        private router: Router,
    ) {
        this.famEstForms = [new FamEstForm];
        this.famEstForm$ = famEstFormSer.entities$;
        this.famEstFormSub = new Subscription();
        this.loading$ = famEstFormSer.loading$;
        this.applTypes = [new ApplType];
        this.applTypes$ = applTypeSer.entities$;
        this.applTypesSub = new Subscription();
        this.countries = [new Country(0,'','')];
        this.countries$ = countrySer.entities$;
        this.countriesSub = new Subscription();
        this.entitySizes = [new EntitySize];
        this.entitySizes$ = entitySizeSer.entities$;
        this.entitySizesSub = new Subscription();
    }

    ngOnInit(): void {
        this.famEstFormSub = this.getFamEstForms().subscribe(x => this.famEstForms = x);
        this.countriesSub = this.getCountries().subscribe(x => this.countries = x);
        this.applTypesSub = this.getApplTypes().subscribe(x => this.applTypes = x);
        this.entitySizesSub = this.getEntitySize().subscribe(x => this.entitySizes = x);
    }

    ngOnDestroy(): void {
        this.famEstFormSub.unsubscribe()
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

    onSubmit(formData: FamEstForm){
        const datetime = JSON.stringify(formData.init_appl_filing_date)
        const dateParts = datetime.split("T")
        const dateSplit = dateParts[0].split('\"')
        const date = dateSplit[1]
        formData.init_appl_filing_date = date
        console.log('formData', formData)
        this.add(formData).subscribe(x =>{
            this.router.navigate(['estimations/' + x.id])})
    }

}
