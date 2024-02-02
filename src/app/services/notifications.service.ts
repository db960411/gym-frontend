import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) {}

  getAllNotificationsByUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/notifications/getAllByUser`);
  }

  updateVisibility(notifications: any): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/notifications/updateVisibility`, notifications);
  }
}
