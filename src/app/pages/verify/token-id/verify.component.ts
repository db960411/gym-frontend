import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutTokenService } from 'src/app/services/checkout-token.service';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  tokenId!: any;
  success!: boolean;
  error!: boolean;


  constructor(private route: ActivatedRoute, private router: Router, private tokenService: CheckoutTokenService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.tokenId = params.get('tokenId');
    });

    if (this.tokenId) {
      this.tokenService.verifyEmailAddressByTokenId(this.tokenId).subscribe(resp => {
        if (resp.success) {
          this.success = true;
          this.error = false;
        } else {
          this.error = true;
          this.success = false;
        }
      })
    }
  }

}
