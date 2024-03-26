import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../interface/News';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

  createNewBlogPost(imageUrl: News, body: News, title: News): Observable<News> {
    return this.http.post<News>(`${environment.apiUrl}/new-blogpost`, {imageUrl, body, title}).pipe(
      catchError(() => {
        console.log("Something went wrong when creating new blog post");
        return [];
      })
    );
  }
}
