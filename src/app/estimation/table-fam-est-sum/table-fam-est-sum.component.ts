import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-fam-est-sum',
  templateUrl: './table-fam-est-sum.component.html',
  styleUrls: ['./table-fam-est-sum.component.scss']
})
export class TableFamEstSumComponent implements OnInit {
  @Input() detSum: any;
  displayedColumns: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
