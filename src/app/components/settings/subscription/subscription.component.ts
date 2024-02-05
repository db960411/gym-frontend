import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-settings-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['../../../pages/settings/settings.component.scss']

})
export class SubscriptionComponent implements OnInit{
  data$: Observable<any> = new Observable<any>();

  constructor(private settingsService: SettingsService){}

  ngOnInit(): void {
      this.data$ = this.settingsService.userSettingsData$;
  }


}
