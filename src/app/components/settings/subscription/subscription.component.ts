import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-settings-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['../../../pages/settings/settings.component.scss']

})
export class SubscriptionComponent {
  @Input() data: any;


}
