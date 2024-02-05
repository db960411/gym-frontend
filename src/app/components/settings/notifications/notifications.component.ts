import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, debounceTime, filter, of, switchMap, tap } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-settings-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['../../../pages/settings/settings.component.scss']

})
export class NotificationsComponent implements OnInit {
  selectedValue!: boolean;
  data$: Observable<any> = new Observable();
  private toggleChangeSubject = new Subject<boolean>();

  constructor(private settingsService: SettingsService, private toastrService: ToastrService){}

  ngOnInit(): void {
    this.settingsService.userSettingsData$.subscribe(data => this.selectedValue = data.allowNotifications)
    this.data$ = this.settingsService.userSettingsData$;

    this.toggleChangeSubject
      .pipe(
        tap((data) => console.log(data)),
        debounceTime(300), 
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
