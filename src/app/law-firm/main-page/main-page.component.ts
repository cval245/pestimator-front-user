import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LawFirm} from '../_models/law-firm.model';
import {LawFirmService} from '../_services/law-firm.service';
import {AccountService} from '../../account/_services/account.service'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
    loading$: Observable<boolean>;
    lawFirms$: Observable<LawFirm[]>;

    constructor(private lawFirmSer: LawFirmService,
                private accSer: AccountService) {
        this.lawFirms$ = lawFirmSer.entities$;
        this.loading$ = lawFirmSer.loading$;
    }

    ngOnInit(): void {
        this.getLawFirms();
    }

    add(lawFirm: LawFirm){
        this.lawFirmSer.add(lawFirm);
    }

    delete(lawFirm: LawFirm){
        this.lawFirmSer.delete(lawFirm)
    }

    getLawFirms(){
        this.lawFirmSer.getAll();
    }

    update(lawFirm: LawFirm){
        this.lawFirmSer.update(lawFirm)
    }

}
