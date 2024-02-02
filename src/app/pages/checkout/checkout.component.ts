import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  submitted: boolean;
  authorised: boolean;
  subscriptionType!: string;
  userHasBeenSubscribed!: boolean;

  constructor(private subscriptionService: SubscriptionService, private settingsService: SettingsService, private toastrService: ToastrService) {
    this.submitted = false;
    this.authorised = false;
  }

  updateSubmitted(submitted: boolean): void {
    this.submitted = submitted;
    this.userHasBeenSubscribed = submitted;
  }

  ngOnInit(): void {
    this.subscriptionService.getSubscriptionStatus().subscribe({
      next: (response: any) => {
          if (response.verified_email) {
            this.authorised = true;
          }
          if (response.subscriptionType) {
            this.subscriptionType = response.subscriptionType;
          }
      },
      error: (error: any) => {
        console.log(error);
      }
    }
    )
  }
  
}
