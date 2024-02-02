import { Component, Input } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-settings-plan-progression',
  templateUrl: './plan-progression.component.html',
  styleUrls: ['../../../pages/settings/settings.component.scss']
})
export class PlanProgressionSettingsComponent {
  @Input() data: any;


  constructor(public settingsService: SettingsService) {
    
  }


}
