import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService{

  constructor(private http: HttpClient) { }


  getNotesByUser(page: number, size: number, category: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/notes?page=${page}&size=${size}&category=${category}`);
  }


  addNewNote(data: any): Observable<any> {
    const objectData = { title: data.title, content: data.content, category: data.category };
    return this.http.post(`${environment.apiUrl}/notes/add-note`, objectData);
  }

  deleteNote(noteId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/notes/delete-note/${noteId}`);
  }
}
