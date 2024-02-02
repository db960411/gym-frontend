import { Component } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-scale-animation',
  template: `
  <div appInView class="scale-box">
    <ng-content></ng-content>
  </div>
`,
  styleUrls: ['./scale-animation.component.scss']
})
export class ScaleAnimationComponent {

}
