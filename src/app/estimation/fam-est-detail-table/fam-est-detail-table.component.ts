import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, ViewChild} from '@angular/core';
import {cloneDeep} from 'lodash';


@Component({
  selector: 'app-fam-est-detail-table',
  templateUrl: './fam-est-detail-table.component.html',
  styleUrls: ['./fam-est-detail-table.component.scss']
})
export class FamEstDetailTableComponent implements OnChanges, AfterViewInit {
  @Input() countryAggeds: any = [{'country': ''}]
  public displayColumns: string[] = ['country']
  public remainColumns = [{
    columnDef: 'year',
    header: 'Year',
    cell: ''
  }]
  private num_cells = 1;
  @Input() displayedColumns = [{
    columnDef: 'year',
    header: 'Year',
    cell: ''
  }]
  publicTotCol: string[] = ['']

  @ViewChild('tableOverContainer') overContainer: any;
  @ViewChild('matTableCell') matTableCell: any;


  constructor(private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit(){
    this.num_cells = this.overContainer.nativeElement.clientWidth
      / this.matTableCell.nativeElement.clientWidth
    this.num_cells = Math.floor(this.num_cells)
    this.displayColumns = this.publicTotCol.slice(0, this.num_cells)
    this.calcRemainColumns()
    this.cd.detectChanges()
  }

  ngOnChanges() {
    this.publicTotCol = this.displayedColumns.map(c => c.columnDef)

    if (this.overContainer != undefined && this.matTableCell != undefined){
      this.calcRemainColumns()
    }
  }

  calcRemainColumns(){
    this.remainColumns = cloneDeep(this.displayedColumns)
    this.remainColumns.splice(1,this.num_cells -1 )
  }
}
