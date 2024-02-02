import { Component } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-slide-in-animation',
  template: `
    <div class="slide-in-content" [@slideInAnimation] class="slide-in-box">
    <ng-content></ng-content>
    </div>
  `,
  animations: [
    trigger('slideInAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(40%)' }),
        animate('600ms ease-in', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
  styleUrls: ['./slide-in-animation.component.scss'],
})
export class SlideInAnimationComponent {}
