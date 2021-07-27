import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {keys, map, omit, values} from 'lodash'

@Component({
  selector: 'app-chart-fam-est-detail',
  templateUrl: './chart-fam-est-detail.component.html',
  styleUrls: ['./chart-fam-est-detail.component.scss']
})
export class ChartFamEstDetailComponent implements OnChanges {
  @Input() countryAggeds: any
  public lineChartType: ChartType = 'bar'
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
      line: {
        tension: 0
      }
    },
        scales: {
          x: {},
          y:
            {
              position: 'left',
              stacked: true,
            },
        },
    };

    constructor() { }

    ngOnChanges(): void {
        if (this.countryAggeds[0] != undefined){
            if (this.countryAggeds[0].country != undefined){
                console.log('this.countryAggeds', this.countryAggeds)
                this.chartData.datasets = map(this.countryAggeds, (obj) => {
                  let data = values(omit(obj, 'country'))
                  return {
                    'label': obj.country.country, 'data': data,
                    backgroundColor: obj.country.color,
                    borderColor: obj.country.color,
                    pointBackgroundColor: obj.country.color,
                    pointBorderColor: obj.country.color,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                    fill: 'origin',
                    'stack': 'a'
                  }
                })
              this.chartData.labels = keys(omit(this.countryAggeds[0],
                'country'))
              this.chart?.update();
              console.log('this.chart', this.chartData)
            }
        }
    }
}
