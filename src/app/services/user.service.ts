import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userHasCreatedProfile$ = new BehaviorSubject<any>(false);
  profileData$ = new BehaviorSubject<User | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  checkUserProfileStatus(): void {
    this.loading$.next(true);
    this.http.get<any>(`${environment.apiUrl}/profile-status`)
      .pipe(
        catchError(error => {
          console.error('Error checking profile status:', error);
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          if (res && res.profileDto != null) {
            this.userHasCreatedProfile$.next(true);
            this.profileData$.next(res.profileDto);
          }
        },
        error: () => {
          this.userHasCreatedProfile$.next(false);
        },
        complete: () => {
          this.loading$.next(false);
        }
      });
  }

  getUserInformation(): Observable<any> {
   return this.http.get<any>(`${environment.apiUrl}/user/getUserInformation`);
  }

  updateUserProfileImage(profileImage: string): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/user/updateImageUrl`, profileImage);
  }

  createProfile(profileForm: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/create-profile`, profileForm)
      .pipe(
        catchError(error => {
          console.error('Error creating profile:', error);
          return [];
        })
      );
  }

    updateProfile(profileForm: any): Observable<any> {
      return this.http.post<any>(`${environment.apiUrl}/update-profile`, profileForm)
        .pipe(
          tap((res: any) => {
            this.profileData$.next(res);
            console.log(this.profileData$)
          }),
          catchError(error => {
            console.error('Error updating profile:', error);
            return error;
          })
        );
}


}
