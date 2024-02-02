import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService) { }

  canActivate(): Observable<boolean> {
   return this.authService.checkIfAuthenticated().pipe(
    switchMap(isAuthenticated => {
      if (isAuthenticated) {
        return of(true);
      } else {
        this.authService.clearCookieAndNavigateToLogin();
        return of(false);
      }
    }),
    catchError(error => {
      console.error('Error during authentication check:', error);
      return of(false);
    })
   )
  }

}