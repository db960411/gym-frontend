import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface/User';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userInfo = Observable<User>;
  isModalActive = false;
  data$!: Observable<any>;
  loading$!: Observable<boolean>;

  constructor(public settingsService: SettingsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loading$ = this.settingsService.loading$;
    this.settingsService.getUserInformation().subscribe();
    this.data$ = this.settingsService.userSettingsData$;
  }

  openModal(): void {
    this.isModalActive = true;
  }

  closeModal(): void {
    this.isModalActive = false;
  }
}
