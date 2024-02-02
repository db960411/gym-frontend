import { Component, Input } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'settings-language',
  templateUrl: './language.component.html',
  styleUrls: ['../../../pages/settings/settings.component.scss']

})
export class LanguageComponent {
  @Input() data: any;

  constructor(public settingsService: SettingsService) {}

}
