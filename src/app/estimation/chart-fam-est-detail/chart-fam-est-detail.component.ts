import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {keys, map, reverse, values} from 'lodash'
import {CountryAggedWise} from "../fam-est-detail/fam-est-detail.component";

@Component({
  selector: 'app-chart-fam-est-detail',
  templateUrl: './chart-fam-est-detail.component.html',
  styleUrls: ['./chart-fam-est-detail.component.scss']
})
export class ChartFamEstDetailComponent implements OnChanges {
  @Input() countryAggeds: CountryAggedWise[] = new Array<CountryAggedWise>()
  public lineChartType: ChartType = 'bar'

  public divStyle: number = 100;
  public enlargedChart: boolean = false;
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
    animation:{
      duration: 0
    },
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      y:
        {
          position: 'left',
          stacked: true,
          title: {
            display: true,
            text: 'USD',
          },
        },
    },
    plugins: {
      legend: {
        position: 'right',
        reverse: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };

    constructor() { }

    ngOnChanges(): void {
        if (this.countryAggeds[0] != undefined){
            if (this.countryAggeds[0].country != undefined) {
              this.chartData.datasets = map(reverse(this.countryAggeds), (obj) => {
                let data = values(obj.row_data)
                return {
                  'label': obj.country.long_name, 'data': data,
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
              this.chartData.labels = keys(this.countryAggeds[0].row_data)
              this.chart?.update();
            }
        }
    }

  canvasClicked() {
    if (this.enlargedChart) {
      this.divStyle = 100;
      this.enlargedChart = false
    } else {
      this.divStyle = 200;
      this.enlargedChart = true
    }
  }
}
