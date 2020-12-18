import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import ExportingModule from 'highcharts/modules/exporting';
import * as Moment from 'moment';
import * as mTZ from 'moment-timezone';

declare global {
  interface Window {
    moment: any;
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'chart';
  chartOptions: Options = {
    chart: {
      type: 'areaspline',
      zoomType: 'x'
    },
    legend: {
      enabled: true
    },
    title: {
      text: 'All Cells'
    },
    time: {
      timezone: 'Europe/Berlin',
      timezoneOffset: -2 * 60
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        millisecond: { main: '%H:%M' },
        second: { main: '%H:%M' },
        minute: { main: '%H:%M' },
        hour: { main: '%H:%M' },
        day: { main: '%H:%M' },
        week: { main: '%e. %b' },
        month: { main: '%b \'%y' },
        year: { main: '%Y' }
      },
      crosshair: true
    },
    yAxis: [
      {
        crosshair: true,
        title: {
          text: 'Power'
        }
      },
      {
        crosshair: true,
        title: {
          text: 'Temperature'
        },
        opposite: true
      }
    ],
    tooltip: {
      // pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
      shared: true,
      formatter: function(tooltip) {
        var s = '';
        if (this.points) {
          this.points.forEach((el: any, index) => {
            s += `<span style="color:${el.color}">${el.series.name}</span>: <b>${el.y}</b><br>`
          });
        }
        return s;
      }
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.2
      }
    },
    exporting: {
      enabled: true,
      fallbackToExportServer: false,
      chartOptions: {
        chart: {
          backgroundColor: 'white'
        }
      }
    },
    credits: {
      enabled: false
    },
    series: []
  };
  updateFlag = false;
  oneToOneFlag = true;
  runOutsideAngularFlag = false;

  constructor() {
    window.moment = Moment;
    mTZ();

    ExportingModule(Highcharts);
    Highcharts.setOptions({
      title: {
        style: {
          color: 'tomato'
        }
      },
      time: {
        timezone: 'Europe/Berlin'
      },
      legend: {
        enabled: true
      }
    });

  }

  ngOnInit() {
    const temperature: any[] = [];
    const channelADCPower: any[] = [];

    // Sample data
    temperature.push({
      x: new Date('2020-12-01 00:00:00').getTime(),
      y: 5
    });
    temperature.push({
      x: new Date('2020-12-01 00:05:00').getTime(),
      y: 7
    });
    temperature.push({
      x: new Date('2020-12-01 00:10:00').getTime(),
      y: 8
    });
    temperature.push({
      x: new Date('2020-12-01 00:15:00').getTime(),
      y: 10
    });
    channelADCPower.push({
      x: new Date('2020-12-01 00:00:00').getTime(),
      y: 2413
    });
    channelADCPower.push({
      x: new Date('2020-12-01 00:05:00').getTime(),
      y: 2620
    });
    channelADCPower.push({
      x: new Date('2020-12-01 00:10:00').getTime(),
      y: 2513
    });
    channelADCPower.push({
      x: new Date('2020-12-01 00:15:00').getTime(),
      y: 2920
    });

    this.chartOptions.series = [
      {
        type: 'areaspline',
        name: 'AC Power South',
        data: channelADCPower,
        stack: 'Power',
        stacking: 'normal',
        turboThreshold: 0
      },{
        type: 'spline',
        name: 'Temperature',
        data: temperature,
        yAxis: 1,
        turboThreshold: 0
      }
    ];
    this.updateFlag = true;
  }

}
