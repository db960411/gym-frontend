import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { User } from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userInfo$: BehaviorSubject<User> = new BehaviorSubject<User>({displayName: '', email: ''});
  
  constructor(private cookieService: CookieService,  private router: Router, private http: HttpClient) {
    this.isAuthenticated();
  }

  checkIfAuthenticated(): Observable<boolean> {
    const token = this.getAuthToken();
    const email = this.getEmail();
    
    const requestBody = { token, email: email };
  
    return this.http.post(`${environment.apiUrl}/jwt`, requestBody).pipe(
      tap((resp: any) => {
       if (!resp) {
        this.clearCookieAndNavigateToLogin();
       }
      }),
      catchError(error => {
        console.error('HTTP error:', error);
        this.clearCookieAndNavigateToLogin();
        return of(false); 
      })
    );
  }

  isAuthenticated(): void {
    const token = this.cookieService.get('token');

    if (!token || this.isTokenExpired(token)) {
      this.isAuthenticated$.next(false);
      this.clearCookieAndNavigateToLogin();
    } else {
      this.isAuthenticated$.next(true);
      this.setUserInfoFromLocalStorage();
    }
  }

  private isTokenExpired(token:string): boolean {
    const decodedToken = this.decodeToken(token);

    if (!decodedToken || !decodedToken.exp) {
      return true;
    }

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);

    return expirationDate < new Date();
    
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (error) {
      return null;
    }
  }

  private setUserInfoFromLocalStorage(): void {
    const localStorageItems = localStorage.getItem('userInfo');
    const jsonParsed = JSON.parse(localStorageItems || '{}');
    this.userInfo$.next(jsonParsed);
  }

  logIn(formData: unknown): Observable<unknown> {
    return this.http.post(`${environment.apiUrl}/auth/authenticate`, formData ).pipe(
      tap((response: any) => {
        if (!!response.successMessage && !!response.access_token) {
          const token = response.access_token;
          this.storeTokenInCookie(token);
          this.storeEmailInLocalstorage(JSON.stringify(({ email: response.email})));
          this.isAuthenticated$.next(true);
        } else {
          this.isAuthenticated$.next(false);
        }
      }),
      catchError(error => {
        this.clearCookieAndNavigateToLogin();
        this.isAuthenticated$.next(false);
        return of({ message: 'Error logging in user', error });
      }),
      );
  }

  
  storeTokenInCookie(token: string): void {
    this.cookieService.set('token', token, undefined, undefined, undefined, undefined, 'Strict');
  }

  storeEmailInLocalstorage(email: string): void {
    localStorage.setItem('userInfo', email);
  }

  getAuthToken(): string | null {
    return this.cookieService.get('token');
  }

  getEmail(): string | null {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      return userInfo.email || null;
    }
    return null;
  }
  

  clearCookieAndNavigateToLogin() {
    this.isAuthenticated$.next(false);
    this.cookieService.delete('token', undefined, undefined, undefined, 'Strict');
    this.router.navigate(['/login']);
  }
  

  signUp(formData: object): Observable<object> {
    return this.http.post(`${environment.apiUrl}/auth/register`, formData).pipe(
      catchError(error => {
        return of({ message: 'Error registering user', error });
      }),
    )

  }

}
