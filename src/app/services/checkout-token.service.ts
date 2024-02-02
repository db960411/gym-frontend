import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutTokenService {

  constructor(private http: HttpClient) { }

  verifyEmailAddressByTokenId(tokenId: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/checkout/verify-token`, tokenId);
  }
}
