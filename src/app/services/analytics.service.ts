import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  getAllByUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/analytics/allbyuser`);
  }
}
