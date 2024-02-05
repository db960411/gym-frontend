import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken()
    const email = this.authService.getEmail();
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    
    if (authToken && email) {
      const authRequest = request.clone({
        setHeaders: { 
          Authorization: `Bearer ${authToken}`,
          Email: `${email}`
        },
        headers: options.headers,
      });
      
      return next.handle(authRequest);
    } else {
      const requestWithHeaders = request.clone({
        headers: options.headers,
      });
      
      return next.handle(requestWithHeaders);
    }
  }
}
