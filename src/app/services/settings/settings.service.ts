import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, finalize, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  loading$ = new BehaviorSubject<boolean>(false);
  params: { [key: string]: string } = { displayName: 'Danne' };
  private modalStateSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  modalState$: Observable<boolean> = this.modalStateSubject$.asObservable();
  currentSettingSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentSetting$: Observable<string> = this.currentSettingSubject.asObservable();
  userSettingsData$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  getUserInformation(): Observable<any> {
    this.loading$.next(true);

    return this.http.get(`${environment.apiUrl}/account-settings`).pipe(
      tap((responseData: any) => this.userSettingsData$.next(responseData)),
      catchError((error) => {
        this.loading$.next(false);
        this.router.navigate(['/login']);
        return throwError(() => error);
      }),
      finalize(() => {
        this.loading$.next(false);
      })
    );
  }

  closeModal(): void {
    this.modalStateSubject$.next(false);
  }

  openModal(setting: string): void {
    this.currentSettingSubject.next(setting);
    this.modalStateSubject$.next(true);
  }

  cancelPlanProgression(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/account-settings/remove-plan`).pipe(
      tap((resp: any) => {
        const currentData = this.userSettingsData$.value;
        const updateData = {...currentData, plan: resp }
        this.userSettingsData$.next(updateData);
      })
    );
  }

  updateEmail(newEmail: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/account-settings/change-email`, newEmail ).pipe(
      tap(() => {
        const currentData = this.userSettingsData$.value;
        const updateData = {...currentData, email: newEmail }
        this.userSettingsData$.next(updateData);
      }
    ));
  }

  updatePassword(newPassword: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/account-settings/change-password`, newPassword);
  }

  updateLanguage(selectedLanguage: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/account-settings/change-language`, selectedLanguage).pipe(
      tap(() => {
        const currentData = this.userSettingsData$.value;
        const updateData = {...currentData, language: selectedLanguage};
        this.userSettingsData$.next(updateData);
      })
    )
  }

  receiveEmails(selectedValue: boolean): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/account-settings/receive-emails`, selectedValue);
  }

  allowNotifications(selectedValue: boolean): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/account-settings/allow-notifications`, selectedValue);
  }

  verifyEmailAddress(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/account-settings/verify-email`)
  }
  
}