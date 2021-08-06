import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {FamEst} from '../_models/FamEst.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
export class FamilyEstimateTableComponent implements AfterViewInit {

  @Input() famEsts: FamEst[] = [new FamEst('')];
  @Input() pageSize = 20;
  public displayedColumns: string[] = ['']
  dataSource: MatTableDataSource<FamEst>;
  expandedElement: FamEst | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor() {
    this.dataSource = new MatTableDataSource(this.famEsts)
  }

  ngOnChanges() {
    this.displayedColumns = ['family_no', 'family_name', 'total_cost']
        this.dataSource = new MatTableDataSource(this.famEsts)
        this.dataSource.paginator = this.paginator
    }

    ngOnInit(): void {
        this.displayedColumns = ['family_no', 'family_name', 'total_cost']
    }

    ngAfterViewInit(){
        this.dataSource.paginator = this.paginator
    }


}
