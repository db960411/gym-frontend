import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { text } from 'express';
import { Observable, catchError } from 'rxjs';
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

  createNewNotification(notificationForm: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/notifications/createNotification`, notificationForm, { responseType: 'text'})
      .pipe(
        catchError((error) => {
          console.error("Something went wrong when creating new global notification:", error);
          throw error; 
        })
      );
  }
  
}
