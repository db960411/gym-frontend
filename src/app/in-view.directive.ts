import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appInView]',
})
export class InViewDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const options = {
      threshold: 0.5, 
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.playAnimation();
        observer.unobserve(this.el.nativeElement);
      }
    }, options);
    

    observer.observe(this.el.nativeElement);
  }

  private playAnimation() {
    this.renderer.addClass(this.el.nativeElement, 'animated'); 
  }
}
