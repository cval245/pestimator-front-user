import {Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {FamEst} from '../../_models/FamEst.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-family-estimate-table',
  templateUrl: './family-estimate-table.component.html',
  styleUrls: ['./family-estimate-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FamilyEstimateTableComponent implements OnChanges {

  @Input() famEsts: FamEst[] = [new FamEst('')];
  @Input() pageSize = 20;
  @Output() famEstFormdataID = new EventEmitter()
  public displayedColumns: string[] = ['']
  dataSource: MatTableDataSource<FamEst>;
  expandedElement: FamEst | null = null;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator
  @ViewChild(MatSort, {static: true}) sort!: MatSort

  constructor() {
    this.dataSource = new MatTableDataSource(this.famEsts)
  }

  ngOnChanges() {
    this.displayedColumns = ['family_no', 'family_name', 'total_cost', 'date_created']
    this.dataSource = new MatTableDataSource(this.famEsts)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  ngOnInit(): void {
    this.displayedColumns = ['family_no', 'family_name', 'total_cost', 'date_created']
  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort
  //   this.dataSource.paginator = this.paginator
  //
  //   this.dataSource = new MatTableDataSource<FamEst>(this.famEsts)
  // }


  seeDetails(element: FamEst) {
    this.famEstFormdataID.emit(element.famestformdata)
  }
}
