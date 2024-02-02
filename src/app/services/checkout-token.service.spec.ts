import { TestBed } from '@angular/core/testing';

import { CheckoutTokenService } from './checkout-token.service';

describe('CheckoutTokenService', () => {
  let service: CheckoutTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
