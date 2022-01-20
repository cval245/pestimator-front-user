import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-table-fam-est-sum',
  templateUrl: './table-fam-est-sum.component.html',
  styleUrls: ['./table-fam-est-sum.component.scss']
})
export class TableFamEstSumComponent {
  @Input() detSum: any;
  displayedColumns: string[] = ['key', 'value'];

  constructor() {
  }

}
