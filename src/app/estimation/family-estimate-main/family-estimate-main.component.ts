import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { FamEst } from '../_models/FamEst.model';
import { FamEstService } from '../_services/fam-est.service';
import { FamilyService } from 'src/app/portfolio/_services/family.service';
import { Family } from 'src/app/portfolio/_models/family.model';
import { map } from 'lodash';

@Component({
  selector: 'app-family-estimate-main',
  templateUrl: './family-estimate-main.component.html',
  styleUrls: ['./family-estimate-main.component.scss']
})
export class FamilyEstimateMainComponent implements OnInit {

    loading$: Observable<boolean>;
    famEst$: Observable<FamEst[]>;
    family$: Observable<Family[]>
    famEsts: FamEst[];
    famEstSub: Subscription;
    families: Family[];
    constructor(
        private famEstSer: FamEstService,
        private familySer: FamilyService
    ) {
        this.famEsts = [new FamEst()]
        this.families = [new Family()]
        this.loading$ = famEstSer.loading$;
        this.famEst$ = famEstSer.entities$;
        this.family$ = familySer.getAll();

        this.famEstSub = combineLatest([this.famEst$, this.family$])
            .subscribe(
                ([famEsts, families])=> {
                    this.families = families
                    this.famEsts = map(famEsts, (x: FamEst) => {
                        let d = families.find(y => y.id == x.id)
                        return {...x, 'family_name': d?.family_name, 'family_no': d?.family_no}
                    })
                }
        )
    }

    ngOnInit(): void {
        this.getFamEsts();
    }
    ngOnDestroy(){
        this.famEstSub.unsubscribe()
    }

    add(famEst: FamEst){
        this.famEstSer.add(famEst);
    }

    delete(famEst: FamEst){
        this.famEstSer.delete(famEst)
    }

    getFamEsts(){
        this.famEstSer.getAll();
    }

    update(famEst: FamEst){
        this.famEstSer.update(famEst)
    }


}
