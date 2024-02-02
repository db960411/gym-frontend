import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  getSubscriptionStatus(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/subscription-state`).pipe(
      catchError((e) => {
        return of( e)
      }));
  }
}