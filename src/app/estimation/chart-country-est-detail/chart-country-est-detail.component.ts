import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {Country} from "../../characteristics/_models/Country.model";

@Component({
  selector: 'app-chart-country-est-detail',
  templateUrl: './chart-country-est-detail.component.html',
  styleUrls: ['./chart-country-est-detail.component.scss']
})
export class ChartCountryEstDetailComponent implements OnChanges {
  @Input() countryAggeds: any
  public lineChartType: ChartType = 'bar'
  public country: Country = new Country();
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

  constructor() {
  }

  ngOnChanges(): void {
    if (this.countryAggeds != undefined) {
      let datasets: any = []
      this.chartData.datasets = datasets
      this.country = this.countryAggeds.country
      // let totAgged = this.countryAggeds.tot_agged.row_data
      let transAgged = this.countryAggeds.trans_agged.row_data
      let officialAgged = this.countryAggeds.official_agged.row_data
      this.chartData.datasets = [
        {
          'label': 'Translation Fees',
          'data': transAgged,
          backgroundColor: '#AA4C46',
          borderColor: '#AA4C46',
          pointBackgroundColor: '#AA4C46',
          pointBorderColor: '#AA4C46',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
          'stack': 'a'
        },
        {
          'label': 'Official Fees',
          'data': officialAgged,
          backgroundColor: '#4682AB',
          borderColor: '#4682AB',
          pointBackgroundColor: '#4682AB',
          pointBorderColor: '#4682AB',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
          'stack': 'a'
        },
      ]
      this.chart?.update();
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
