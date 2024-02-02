import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'settings-account',
  templateUrl: './account.component.html',
  styleUrls: ['../../../pages/settings/settings.component.scss']

})
export class AccountComponent {
  @Input() data: any;

  constructor(public settingsService: SettingsService, private toastrService: ToastrService) {}


  
  submitVerifyEmail(): void {
    this.settingsService.verifyEmailAddress().subscribe((resp) => {
     if (resp.successMessage) {
      this.toastrService.success(resp.successMessage);
     } else {
      this.toastrService.error(resp.errorMessage);
     }
    });
  }
}
