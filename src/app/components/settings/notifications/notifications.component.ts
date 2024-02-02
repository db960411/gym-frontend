import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, of, switchMap } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-settings-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['../../../pages/settings/settings.component.scss']

})
export class NotificationsComponent implements OnInit {
  selectedValue!: boolean;
  @Input() data: any;

  private toggleChangeSubject = new Subject<boolean>();

  constructor(private settingsService: SettingsService, private toastrService: ToastrService){}

  ngOnInit(): void {
    this.selectedValue = this.data;
    
    this.toggleChangeSubject.next(this.selectedValue);
    
    this.toggleChangeSubject
      .pipe(
        debounceTime(1000), 
        switchMap((value) => {
          if (value != null) {
            return this.settingsService.allowNotifications(value);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((response) => {
          if (response.successMessage) {
            this.toastrService.success(response.successMessage);
          } else {
            this.toastrService.error("There was an error updating notifications preferences")
          }
      });
  }

  onSlideToggleChange(event: any): void {
    this.selectedValue = event.checked;

     this.toggleChangeSubject.next(this.selectedValue);

  }

}
