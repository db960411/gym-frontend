import { Component, Input } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { UserAnalyticsData } from 'src/app/interface/UserAnalyticsData';

@Component({
  selector: 'app-user-analytics-chart',
  templateUrl: './user-analytics-chart.component.html',
  styleUrls: ['./user-analytics-chart.component.scss']
})
export class UserAnalyticsChartComponent {
  @Input() analyticsData!: any;

  theme = 'light';
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Legend';
  legendPosition = LegendPosition.Right;
  showXAxisLabel = true;
  tooltipDisabled = false;
  showText = true;
  xAxisLabel = 'Weeks';
  showYAxisLabel = true;
  yAxisLabel = 'Amount';


  constructor() {
    console.log(this.analyticsData);
  }

}
