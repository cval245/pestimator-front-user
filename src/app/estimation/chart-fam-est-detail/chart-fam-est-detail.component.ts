import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { map, values, omit, keys } from 'lodash'

@Component({
  selector: 'app-chart-fam-est-detail',
  templateUrl: './chart-fam-est-detail.component.html',
  styleUrls: ['./chart-fam-est-detail.component.scss']
})
export class ChartFamEstDetailComponent implements OnInit {
    @Input() countryAggeds: any
    public lineChartType: ChartType='line'
    //public chartData: ChartDataSets[]=[{data:[], label:'', stack:''}]
    //public chartData: ChartDataset[]=[{data:[], label:'', stack:''}]
    public chartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [0, 1, 2, 3, 4, 3, 2],
                label: 'label',
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                fill: 'origin'
            }
        ]

    }
    public lineChartLegend = true;
    //public lineChartLabels: Label[] = [''];
    public config = {
        type: 'line',
    }
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    public lineChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        elements: {
            line:{
                tension: 0
            }
        },
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            //xAxes: [{}],
            x: {},
            y: //[
                {
                    position: 'left',
                    stacked: true,
                },
            //]
        },
        // plugins: {
        //     legend: { display: true},
        //     annotation: {
        //         annotations: [
        //             {
        //                 type: 'line',
        //             }
        //         ]
        //     }
        //}//,
        // annotation: {
        // },
    };

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
        if (this.countryAggeds[0] != undefined){
            if (this.countryAggeds[0].country != undefined){
                console.log('this.countryAggeds', this.countryAggeds)
                this.chartData.datasets = map(this.countryAggeds, (obj) => {
                    let data = values(omit(obj, 'country'))
                    return {'label': obj.country.country, 'data' : data,
                            backgroundColor: 'rgba(148,159,177,0.2)',
                            borderColor: 'rgba(148,159,177,1)',
                            pointBackgroundColor: 'rgba(148,159,177,1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                            fill: 'origin',
                            'stack': 'a'
                           }
                })
                this.chartData.labels = keys(omit(this.countryAggeds[0], 'country'))
                this.chart?.update();
                console.log('this.chart', this.chartData)
            }
        }
    }
}
