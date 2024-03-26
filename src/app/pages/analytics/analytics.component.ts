import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExercisesAnalyticsData } from 'src/app/interface/ExercisesAnalyticsData';
import { User } from 'src/app/interface/User';
import { UserAnalyticsData } from 'src/app/interface/UserAnalyticsData';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  userAnalytics = false;
  userInfo$: Observable<User | null>;
  userAnalyticsData$!: Observable<UserAnalyticsData[] | null>;
  exercisesAnalyticsData$!: Observable<ExercisesAnalyticsData[] | null>;

  constructor(private analyticsService: AnalyticsService, private authService: AuthService){
    this.userInfo$ = this.authService.userInfo$;
    this.userAnalyticsData$ = this.analyticsService.userAnalyticsData$;
    this.exercisesAnalyticsData$ = this.analyticsService.exercisesAnalyticsData$;
  }

  ngOnInit(): void {
      this.analyticsService.getAllByUser().subscribe()
      this.analyticsService.getAllExercisesAnalyticsForUser().subscribe()
      console.log(this.exercisesAnalyticsData$)
  }
}
