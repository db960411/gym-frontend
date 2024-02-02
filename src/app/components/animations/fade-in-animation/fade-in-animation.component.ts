import { Component } from '@angular/core';

@Component({
  selector: 'app-fade-in-animation',
  styleUrls: ['./fade-in-animation.component.scss'],
  template: `
     <div appInView class="fadeIn-animation"><ng-content></ng-content></div>
  `,
})
export class FadeInTextAnimationComponent {}
