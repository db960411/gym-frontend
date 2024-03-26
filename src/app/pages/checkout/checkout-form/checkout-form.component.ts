import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StripeCardElement, Stripe, StripeElements, StripeCardElementOptions } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { from, switchMap } from 'rxjs';
import { CheckoutService } from 'src/app/services/checkout.service';


@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {
  @Input() authorised!: boolean;
  @Input() submitted!: boolean;
  @Output() submittedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() userHasBeenSubscribed!: boolean;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#32325d',
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
      },
    },
  };
  cardElement: StripeCardElement | null = null;
  error: boolean;
  errorMessage: string | undefined;
  submitting: boolean;
  
  subscribedEmail: boolean;

  constructor(
    private checkoutService: CheckoutService,
    private toastService: ToastrService
  ) {
    this.error = false;
    this.submitting = false;
    this.subscribedEmail = false;
  }

  async ngOnInit(): Promise<void> {
    await this.checkoutService.initializeStripe('pk_test_51NeitKEQK2sno4Ko7HcDd2VflFfJXXz7cjFFiSdvSzzDAXIQ236lvXySM0PTdcoBj2WGeJEc3HCj6UCatGkOLgwH00F29Jdl69');

    const stripe: Stripe | null = this.checkoutService.stripe;
    const elements: StripeElements | null = this.checkoutService.elements;

    if (!stripe || !elements) {
      console.error('Stripe or elements is not properly initialized.');
      return;
    }

    this.cardElement = elements.create('card', this.cardOptions);
    this.cardElement.mount('#card-element');


    console.log("authorised", this.authorised, "submitting", this.submitting)
  }

async submitPayment(): Promise<void> {
  if (!this.cardElement) {
    console.error('Stripe card element is not initialized.');
    return;
  }

  this.submitting = true;

  const stripe: Stripe | null = this.checkoutService.stripe;

  if (!stripe) {
    console.error('Stripe is not properly initialized.');
    return;
  }
  const { token, error } = await stripe.createToken(this.cardElement);

  if (error) {
    this.submitting = false;
    this.error = true;
    this.errorMessage = error.message;
    console.error(error.message);
  } else {
    this.checkoutService.createPaymentIntent(token.id)
      .pipe(
          switchMap((response: any) => {
              const paymentIntentId = response.clientSecret;

              if (!paymentIntentId) {
                  console.error('Payment intent ID is missing.');
                  return [];
              }

              const stripe: Stripe | null = this.checkoutService.stripe;

              if (!stripe) {
                  console.error('Stripe is not properly initialized.');
                  return [];
              }

              return from(stripe.confirmCardPayment(paymentIntentId, {
                  payment_method: {
                      card: this.cardElement as StripeCardElement,
                  },
              }));
          }),
      )
      .subscribe((result) => {
          if (result.error) {
              this.submitting = false;
              this.error = true;
              this.errorMessage = result.error.message;
          } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
              this.submitting = false;
              this.error = false;
              this.submitted = true;
              this.submittedChange.emit(this.submitted);
              this.checkoutService.updateUserToSubscribedMember().subscribe({
                next: (response) => {
                  this.toastService.success(response.successMessage);
                  this.submittedChange.emit(this.submitted);
                },
                error: (error) => {
                  console.log(error);
                  this.userHasBeenSubscribed = false;
                }
               })
          }
      });
    }
  }
}
