import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'settings-account',
  templateUrl: './account.component.html',
  styleUrls: ['../../../pages/settings/settings.component.scss']

})
export class AccountComponent implements OnInit {
  data$: Observable<any> = new Observable();

  constructor(public settingsService: SettingsService, private toastrService: ToastrService) {}

  ngOnInit(): void {
      this.data$ = this.settingsService.userSettingsData$;
  }

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
