import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  private modalStateSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public modalState$: Observable<boolean> = this.modalStateSubject$.asObservable();

  constructor(private http: HttpClient) { }


  closeModal(): void {
    this.modalStateSubject$.next(false);
  }

  openModal(setting: string): void {
    this.modalStateSubject$.next(true);
  }

  checkPlanStatus(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/plans/checkPlanStatusForUser`);
  }
 
  assignPlan(selectedPlan: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/plans/assignPlanToUser`, selectedPlan)
  }

  updatePlanProgressionDay(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/planProgression/updatePlanProgressionDay`);
  }

  cancelPlanProgressionByUser(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/planProgression/cancelPlanProgressionByUser`);
  }
 
}
