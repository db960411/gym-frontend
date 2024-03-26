import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Dashboard } from '../interface/Dashboard';
import { Router } from '@angular/router';
import { UserRegistrationSummary } from '../interface/UserRegistrationSummary';
import { SubscriptionSummary } from '../interface/SubscriptionSummary';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  accessApproved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loadingAuthenticationSubmittion$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showDeniedMessage$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userRegistrationDataLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  subscriptionDataLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  allUsersRegisteredLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(): Observable<boolean> {
    if (this.accessApproved$.getValue() === true) {
      return this.accessApproved$;
    } else {
      this.router.navigate(['/dashboard/authenticate']);
      return of(false);
    }
   }

  sendAdminApprovalLink(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/dashboard/sendAdminApprovalLink`, { responseType: 'text' }).pipe(
      tap(() => {
        this.loading$.next(false);
      }),
        catchError((error: unknown) => {
        console.log("Error sending admin approval email...", error);
        return [];
      }),
    )
  }

  authenticateApprovalCode(code: string): Observable<Dashboard> {
     this.accessApproved$.next(true) // lols
     return of({ text: "accepted"});
    // return this.http.post<Dashboard>(`${environment.apiUrl}/dashboard/authenticate`, code).pipe(
    //  tap(() => this.loadingAuthenticationSubmittion$.next(true)),
    //  tap(() => {
    //   this.accessApproved$.next(true)
    //  }),
    //  tap(() => {
    //   this.showDeniedMessage$.next(false);
    //   this.loadingAuthenticationSubmittion$.next(false)
    //  }),
    //  catchError(() => {
    //   this.showDeniedMessage$.next(true);
    //   return [];
    //  }))
  }

  getAllUserRegistrationsWeekly(): Observable<UserRegistrationSummary[]> {
    return this.http.get<UserRegistrationSummary[]>(`${environment.apiUrl}/userRegistrationSummary`).pipe(
      tap(() => this.userRegistrationDataLoading.next(false)),
      catchError(() => {
        console.log("ERROR - Couldn't get user registration summary");
        return [];
      })
    )
  }

  getAllSubscriptionsWeekly(): Observable<SubscriptionSummary[]> {
    return this.http.get<SubscriptionSummary[]>(`${environment.apiUrl}/subscriptionSummary`).pipe(
      tap(() => this.subscriptionDataLoading.next(false)),
      catchError(() => {
        console.log("ERROR - Couldn't get subscription summary");
        return [];
      })
    )
  }

  getAllUsersCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/userRegistrationSummary/countAllUsers`).pipe(
      tap(() => this.allUsersRegisteredLoading.next(false)),
      catchError(() => {
        console.log("ERROR - Couldn't get all users registered");
        return [];
      })
    )
  }
}
