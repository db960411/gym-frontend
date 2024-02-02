import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProgressFormData } from '../interface/ProgressFormData';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(private http: HttpClient) { }


  getProgress(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/progress`);
  }

  addProgress(formData: ProgressFormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/progress/add-progress`, formData);
  }

  deleteProgress(exerciseId: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/progress/delete-progress/${exerciseId}`);
  }

  editProgress(exerciseId: any, data: any): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/progress/edit-progress/${exerciseId}`, data);
  }
  
}