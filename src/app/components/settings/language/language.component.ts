import { Component, OnInit } from '@angular/core';
import { Observable, filter, tap } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'settings-language',
  templateUrl: './language.component.html',
  styleUrls: ['../../../pages/settings/settings.component.scss']

})
export class LanguageComponent implements OnInit{
  data$: Observable<any> = new Observable();

  constructor(public settingsService: SettingsService) {}

  ngOnInit(): void {
      this.data$ = this.settingsService.userSettingsData$.pipe(
        filter(data => data.language),
      );
  }

}
