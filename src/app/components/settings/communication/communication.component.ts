import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'settings-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['../../../pages/settings/settings.component.scss']

})
export class CommunicationComponent implements OnInit {
  selectedValue!: boolean;
  @Input() data: any;

  private toggleChangeSubject = new Subject<boolean>();

  constructor(private settingsService: SettingsService, private toastrService: ToastrService){}

  ngOnInit(): void {
    this.selectedValue = this.data?.receiveEmails;
    
    this.toggleChangeSubject.next(this.selectedValue);
    
    this.toggleChangeSubject
      .pipe(
        debounceTime(1000), 
        switchMap((value) => {
          if (value != null) {
            return this.settingsService.receiveEmails(value);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((response) => {
          if (response.successMessage) {
            this.toastrService.success("Successfully updated email preferences");
          } else {
            this.toastrService.error("There was an error updating email preferences")
          }
      });
  }

  onSlideToggleChange(event: any): void {
    this.selectedValue = event.checked;
    this.toggleChangeSubject.next(this.selectedValue);

  }

}
