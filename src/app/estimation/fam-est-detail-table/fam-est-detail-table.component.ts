import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FamEstDetail } from '../_models/FamEstDetail.model';
import { each } from 'lodash';



@Component({
  selector: 'app-fam-est-detail-table',
  templateUrl: './fam-est-detail-table.component.html',
  styleUrls: ['./fam-est-detail-table.component.scss']
})
export class FamEstDetailTableComponent implements OnInit {
    displayedColumns: string[]=['']
    @Input() famEstDetails: FamEstDetail[]
    @Input() countryAggeds: any
    // @HostListener('window:resize', ['$event'])
    // onResize(event: any){
    //     event.target.innerWidth;
    //     console.log('eeeee', event.target.innerWidth)
    // }
    public countryAgged = [{}]
    public columns=[{
        columnDef: 'year',
        header: 'Year',
        cell: ''
    }]
    constructor() {
        this.famEstDetails = [new FamEstDetail()]
    }

    ngOnInit(): void {
    }

    ngOnChanges(){
        //this.calcTotal()
        //this.countryAgged = this.calcTotalMatrix()
        this.columns = this.calcColumns(this.countryAggeds)
        this.displayedColumns = this.columns.map(c => c.columnDef)
    }

    calcColumns(countryAgged: any){
        let columns = [
            {
                columnDef: 'country',
                header: 'Country',
                cell: 'country'
            },
        ]
        //let keys = Object.keys(countryAgged)
        // find minimum year and maximum year
        let min_max_year = this.findMinMaxYear(countryAgged)
        let year = min_max_year['min_year']
        console.log('coutn', countryAgged)
        while(year<=min_max_year['max_year']) {
            let g = {
                columnDef: JSON.stringify(year),
                header: JSON.stringify(year),
                cell: JSON.stringify(year)
            }
            columns.push(g)
            year += 1
        }
        return columns
    }

    // find minimum and maximum years
    findMinMaxYear(countryAgged: any){
        let min_year=0
        let max_year=0
        each(countryAgged, (x) => {
            each(Object.keys(x), (y) => {
                if (y != 'country') {
                    let y_parsed = parseInt(y)
                    if(min_year == 0){
                        min_year = y_parsed
                        max_year = y_parsed
                    }
                    if (y_parsed < min_year){
                        min_year = y_parsed
                    } else if (y_parsed > max_year){
                        max_year = y_parsed
                    }
                }
            })
        })
        return {'min_year': min_year, 'max_year': max_year}
    }

}
