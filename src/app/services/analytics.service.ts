import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAnalyticsData } from '../interface/UserAnalyticsData';
import { ExercisesAnalyticsData } from '../interface/ExercisesAnalyticsData';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  userAnalyticsData$: BehaviorSubject<UserAnalyticsData[] | null> = new BehaviorSubject<UserAnalyticsData[] | null>(null);
  exercisesAnalyticsData$: BehaviorSubject<ExercisesAnalyticsData[] | null> = new BehaviorSubject<ExercisesAnalyticsData[] | null>(null);

  constructor(private http: HttpClient) { }

  getAllByUser(): Observable<UserAnalyticsData[]> {
    return this.http.get<UserAnalyticsData[]>(`${environment.apiUrl}/user/analytics/allUserAnalytics`).pipe(
      tap((res: UserAnalyticsData[]) => {
        this.userAnalyticsData$.next(res);
      }),
      catchError(() => {
        console.log("THERE WAS AN ERROR fetching userAnalytics data...");
        return [];
      })
    );
  }

  getAllExercisesAnalyticsForUser(): Observable<ExercisesAnalyticsData[]> {
    return this.http.get<ExercisesAnalyticsData[]>(`${environment.apiUrl}/exercises/analytics/allByUser`).pipe(
      tap((res: ExercisesAnalyticsData[]) => {
        this.exercisesAnalyticsData$.next(res);
      }),
      catchError(() => {
        console.log("THERE WAS AN ERROR fetching exercisesAnalytics data...");
        return [];
      })
    )
  }
}
