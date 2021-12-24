import {Component, Input} from '@angular/core';
import {Application} from 'src/app/_models/application.model';

@Component({
  selector: 'app-fam-det-table',
  templateUrl: './fam-det-table.component.html',
  styleUrls: ['./fam-det-table.component.scss']
})
export class FamDetTableComponent {

  @Input() applications: Application[]
  public displayedColumns = ['country', 'application_type', 'date_filing']

  constructor() {
    this.applications = [new Application]
  }
}
