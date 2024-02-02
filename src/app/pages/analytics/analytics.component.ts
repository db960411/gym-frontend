import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  noAnalyticsFound = false;
  analyticsData!: any[];

  constructor(private analyticsService: AnalyticsService){}

  ngOnInit(): void {
      this.analyticsService.getAllByUser().subscribe({
        next: (response: any[]) => {
          this.analyticsData = response;
        },
        error: (error: any) => {
          if (error.status === 404) {
            console.log(error)
            this.noAnalyticsFound = true;
          }
        }
      })
  }
}
