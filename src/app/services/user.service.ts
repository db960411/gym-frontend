import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from '../interface/User';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userHasCreatedProfile$ = new BehaviorSubject<any>(false);
  profileData$ = new BehaviorSubject<User | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private jwtHelper: JwtHelperService, private authService: AuthService, private http: HttpClient, private router: Router) {}

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

}
