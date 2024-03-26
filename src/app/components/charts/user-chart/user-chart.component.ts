import { Component, Input } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';
import { SubscriptionSummary } from 'src/app/interface/SubscriptionSummary';
import { UserRegistrationSummary } from 'src/app/interface/UserRegistrationSummary';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.scss']
})
export class UserChartComponent {
  theme = 'light';
  @Input() graphData!: UserRegistrationSummary[];
  @Input() newSubscriptionsGraphData!: SubscriptionSummary[];
  @Input() allUsersGraphData!: any;
  @Input() subscriptionDataLoading!: Observable<boolean>;
  @Input() userRegistrationDataLoading!: Observable<boolean>;

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

}
