import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { News } from '../interface/News';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getNews(page: number, size: number, category: string): Observable<News[]> {
    this.loading$.next(true);
    return this.http.get<any>(`${environment.apiUrl}/news?page=${page}&size=${size}&category=${category}`).pipe(
      catchError((error) => {
        this.loading$.next(false);
          return throwError(() => error);
      }),
      finalize(() => this.loading$.next(false))
    );
  }

  subscribeToNewsLetter(formData: object): Observable<unknown> {
   return this.http.post(`${environment.apiUrl}/newsletter/sign-up`, formData).pipe(
    catchError((e) => {
      return of({ message: 'Error signing up to newsletter', e})
    })
   )
  }

  getNewsInformationForSpecificBlog(blogId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/getNewsInformationForSpecificBlog/${blogId}`);
  }

}
