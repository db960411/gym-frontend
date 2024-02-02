import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private http: HttpClient) {}

  getOrCreateSocialForUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/social`);
  }

  addFriendForUser(friendSocialId: number): Observable<any> {
      return this.http.post(`${environment.apiUrl}/social/add-friend`, friendSocialId);
  }

  acceptFriendForUser(friendSocialId: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/social/accept-friend`, friendSocialId);
  }
  
  removeFriendForUser(friendSocialId: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/social/remove-friend`, friendSocialId);
  }

  getProgressOfFriend(friendSocialId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/social/getProgressOfFriend/${friendSocialId}`);
  }

 }
