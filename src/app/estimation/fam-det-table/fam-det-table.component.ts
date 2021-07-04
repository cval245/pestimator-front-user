import { Component, OnInit, Input } from '@angular/core';
import { Application } from 'src/app/application/_models/application.model';

@Component({
  selector: 'app-fam-det-table',
  templateUrl: './fam-det-table.component.html',
  styleUrls: ['./fam-det-table.component.scss']
})
export class FamDetTableComponent implements OnInit {

    @Input() applications: Application[]
    public displayedColumns = ['id', 'country', 'application_type', 'date_filing']
    constructor() {
        this.applications = [new Application]
    }

    ngOnInit(): void {
    }

    ngOnChanges(){
        console.log('this.applications', this.applications)
    }

}
