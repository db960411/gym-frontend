import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stripe, StripeElements, StripeCardElementOptions } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;

  constructor(private http: HttpClient) {}

  async initializeStripe(apiKey: string) {
    try {
      this.stripe = await (await import('@stripe/stripe-js')).loadStripe(apiKey);
      const elems = this.stripe?.elements();
      elems ? this.elements = elems : null
    } catch (error) {
      console.error('Error initializing Stripe:', error);
    }
  }

  createCardElement(options: StripeCardElementOptions): any {
    const card = this.elements?.create('card', options);
    return card;
  }

  public getPaymentKey(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/create-checkout-session`);
  }

  public createPaymentIntent(token: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/createPaymentIntent`, token);
  }

  public updateUserToSubscribedMember(): Observable<any> {
   return this.http.get(`${environment.apiUrl}/updateUserToSubscribedMember`); 
  }
}
